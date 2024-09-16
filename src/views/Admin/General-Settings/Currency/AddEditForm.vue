<template>
  <form @submit.prevent="handleSubmit">
    <div class="p-6.5 grid grid-cols-3 gap-2">
      <div class="flex flex-col">
        <InputLabel for="Country" value="From Country" />
        <Select
          :options="props.allCurrencies"
          showfield="currency"
          class="w-full"
          valueField="code"
          label="Select Country"
          v-model="form.from_currency"
        />
      </div>
      <div class="flex flex-col">
        <InputLabel for="Status" value="To Country" />
        <Select
          :options="props.allCurrencies"
          showfield="currency"
          class="w-full"
          valueField="code"
          label="Select Country"
          v-model="form.to_currency"
        />
        <InputError v-if="errors" class="mt-2" message="chnge Countries" />
        <p v-if="errors">chnge countries</p>
      </div>

      <div class="flex flex-col">
        <TextInput
          type="text"
          label="Exchange Rate *"
          class="block mr-2 h-[40px] w-full"
          v-model="form.exchange_rate"
        />
      </div>
      <div class="flex flex-col">
        <InputLabel for="Country" value="From Country" />
        <Select
          disabled
          :options="props.allCurrencies"
          showfield="currency"
          class="w-full"
          valueField="code"
          label="Select Country"
          v-model="form.to_currency"
        />
      </div>
      <div class="flex flex-col">
        <InputLabel for="Status" value="To Country" />
        <Select
          disabled
          :options="props.allCurrencies"
          showfield="currency"
          class="w-full"
          valueField="code"
          label="Select Country"
          v-model="form.from_currency"
        />
      </div>
      <div class="flex flex-col">
        <TextInput
          type="text"
          disabled
          label="Exchnage rate *"
          class="block mr-2 h-[40px] w-full"
          v-model="form.exchange_rateFixed"
        />
      </div>
      <div class="flex flex-col"></div>
      <div class="flex flex-col">
        <button
          type="submit"
          class="flex mx-auto mt-7 w-full mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { defineEmits } from 'vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import store from '@/store'

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  exchangeData: {
    type: Object,
    default: { from_currency: null, to_currency: null, exchange_rate: 0, exchange_rateFixed: '' }
  },
  allCurrencies: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['handleApi'])

const form = ref(props.exchangeData)
const errors = ref()
const domainStatus = [
  { name: 'Active', value: 1 },
  { name: 'inactive', value: 0 }
]

const validateForm = () => {
  let isValid = true
  errors.value = {}
  if (!form.value.name) {
    errors.value.name = 'Domain Name is required'
    isValid = false
  }
  return isValid
}

const handleSubmit = async () => {
  // if (validateForm()) {
  let payload = null
  if (form.value.id) {
    payload = {
      id: form.value.id,
      from_currency: form.value.from_currency,
      to_currency: form.value.to_currency,
      exchange_rate: form.value.exchange_rate
    }
  } else {
    payload = {
      exchange_rates: [
        {
          from_currency: form.value.from_currency,
          to_currency: form.value.to_currency,
          exchange_rate: form.value.exchange_rate
        },
        {
          from_currency: form.value.to_currency,
          to_currency: form.value.from_currency,
          exchange_rate: form.value.exchange_rateFixed
        }
      ]
    }
  }
  emit('handleApi', { ...payload })
  // }
}

watch(
  () => form.value.exchange_rate,
  (newValue, oldValue) => {
    if (newValue !== 0) {
      form.value.exchange_rateFixed = (1 / newValue).toFixed(3)
    } else {
      form.value.exchange_rateFixed = ''
    }
  }
)

onMounted(() => {
  const { exchange_rate } = form.value
  if (exchange_rate !== 0) {
    form.value.exchange_rateFixed = (1 / exchange_rate).toFixed(3)
  } else {
    form.value.exchange_rateFixed = ''
  }
})
</script>
