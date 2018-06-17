<template>
  <div>
    <div class="q-subheading">{{ $t('components.tolerance-calculator.title') }}</div>
    <div class="row items-center gutter-md">
        <q-field class="col-md-4 col-xs-12" :error-label="formErrors.size">
            <q-input :error="$v.form.size.$error" :value="form.size" :float-label="$t('components.tolerance-calculator.size')+', '+$t('unit.mm')" @blur="$v.form.size.$touch()" @change="initFieldQuality"/>
        </q-field>
        <q-field class="col-md-4 col-xs-6">
            <q-select filter :value="form.fieldQuality" :options="form.fieldQualities" :float-label="$t('components.tolerance-calculator.field')" @change="calculateTolerance"/>
        </q-field>
        <div class="col-md-4 col-xs-6 row gutter-sm">
            <q-field class="col-12">
                <q-input v-model="form.tolerance.max" inverted readonly :suffix="$t('unit.mm')"/>
            </q-field>
            <q-field class="col-12">
                <q-input v-model="form.tolerance.min" inverted readonly :suffix="$t('unit.mm')"/>
            </q-field>
        </div>
    </div>
  </div>
</template>

<script>
import { between } from 'vuelidate/lib/validators'

export default {
  name: 'ToleranceCalculator',
  data () {
    return {
      sizeLimit: {
        max: null,
        min: null
      },
      form: {
        size: null,
        fieldQuality: null,
        fieldQualities: [],
        tolerance: {
          min: null,
          max: null
        }
      }
    }
  },
  methods: {
    initFieldQuality (val) {
      this.form.size = val
      this.form.fieldQualities = []
      this.form.fieldQuality = null
      this.form.tolerance.max = null
      this.form.tolerance.min = null
      if (!this.$v.form.size.$error) {
        this.$http.get(process.env.API_URL + '/v1/fields-qualities', {
          params: {size: this.form.size}
        }).then(
          response => {
            this.form.fieldQualities = response.body.map(val => {
              return {
                label: val,
                value: val
              }
            })
          }
        )
      }
    },
    calculateTolerance (val) {
      this.form.fieldQuality = val
      this.form.tolerance.max = null
      this.form.tolerance.min = null
      this.$http.get(process.env.API_URL + '/v1/tolerance', {
        params: {
          size: this.form.size,
          'field-quality': this.form.fieldQuality
        }
      }).then(
        response => {
          this.form.tolerance.max = parseFloat(response.body.max_val) / 1000
          this.form.tolerance.min = parseFloat(response.body.min_val) / 1000
        }
      )
    }
  },
  computed: {
    formErrors () {
      return {
        size: this.$t('components.tolerance-calculator.error.size', {max: this.sizeLimit.max, min: this.sizeLimit.min})
      }
    }
  },
  validations () {
    return {
      form: {
        size: {
          between: between(this.sizeLimit.min, this.sizeLimit.max)
        }
      }
    }
  },
  created: function () {
    this.$http.get(process.env.API_URL + '/v1/ranges-limits').then(
      response => {
        this.sizeLimit.max = response.body.max_val
        this.sizeLimit.min = response.body.min_val
      }
    )
  }
}
</script>
