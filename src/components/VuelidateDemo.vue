<script setup>
import useVuelidate from '@vuelidate/core'
import { computed, reactive } from 'vue'
import { required, numeric, email, url, helpers } from '@vuelidate/validators'

defineProps({
    msg: {
        type: String,
        default: 'Hello World!',
    },
})

const initialState = () => ({
    first_name: '',
    last_name: '',
    other_names: '',
    age: 0,
    email: '',
    website: '',
})

const person = reactive(initialState())

const rules = computed(() => {
    return {
        first_name: {
            required: helpers.withMessage('First name is required', required),
            $autoDirty: true,
        },
        last_name: { required, $autoDirty: true },
        age: { required, numeric, $autoDirty: true },
        email: { required, email, $autoDirty: true },
        website: { required, url, $autoDirty: true },
    }
})

const v$ = useVuelidate(rules, person)

const handleSubmit = async (e) => {
    const result = await v$.value.$validate()

    if (!result) {
        alert('The form has errors')
        return
    }
    alert('Form submitted successfully')

    e.target.reset()
    clearForm()
}

const clearForm = () => {
    Object.assign(person, initialState())
    v$.value.$reset()
}
</script>

<template>
    <div class="flex shrink-0 justify-center min-w-[363px]">
        <div
            class="flex-col gap-2 p-5 mt-5 w-3/5 h-auto rounded-lg border border-gray-300 shadow-md"
        >
            <h1>Please complete form - {{ msg }}</h1>
            <form @submit.prevent="handleSubmit">
                <div class="flex-col text-left">
                    <div class="w-full">
                        <p class="mt-8 text-sm font-semibold">First Name</p>
                        <input
                            v-model="person.first_name"
                            type="text"
                            :class="
                                v$.first_name.$error === true
                                    ? 'text-fields-error'
                                    : 'text-fields'
                            "
                            @blur="v$.first_name.$touch"
                        />
                        <p
                            v-for="error of v$.first_name.$errors"
                            :key="error.$uid"
                            class="text-xs font-thin text-red-500"
                        >
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="w-full">
                        <p class="mt-8 text-sm font-semibold">Last Name</p>
                        <input
                            v-model="person.last_name"
                            type="text"
                            :class="
                                v$.last_name.$error === true
                                    ? 'text-fields-error'
                                    : 'text-fields'
                            "
                            @blur="v$.last_name.$touch"
                        />
                        <p
                            v-for="error of v$.last_name.$errors"
                            :key="error.$uid"
                            class="text-xs font-thin text-red-500"
                        >
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="w-full">
                        <p class="mt-8 text-sm font-semibold">Other Names</p>
                        <input
                            v-model="person.other_names"
                            type="text"
                            class="text-fields"
                        />
                    </div>
                    <div class="w-full">
                        <p class="mt-8 text-sm font-semibold">Age</p>
                        <input
                            v-model="person.age"
                            type="text"
                            :class="
                                v$.age.$error === true
                                    ? 'text-fields-error'
                                    : 'text-fields'
                            "
                            @blur="v$.age.$touch"
                        />
                        <p
                            v-for="error of v$.age.$errors"
                            :key="error.$uid"
                            class="text-xs font-thin text-red-500"
                        >
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="w-full">
                        <p class="mt-8 text-sm font-semibold">Email</p>
                        <input
                            v-model="person.email"
                            type="text"
                            :class="
                                v$.email.$error === true
                                    ? 'text-fields-error'
                                    : 'text-fields'
                            "
                            @blur="v$.email.$touch"
                        />
                        <p
                            v-for="error of v$.email.$errors"
                            :key="error.$uid"
                            class="text-xs font-thin text-red-500"
                        >
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="w-full">
                        <p class="mt-8 text-sm font-semibold">Website</p>
                        <input
                            v-model="person.website"
                            type="text"
                            :class="
                                v$.website.$error === true
                                    ? 'text-fields-error'
                                    : 'text-fields'
                            "
                            @blur="v$.website.$touch"
                        />
                        <p
                            v-for="error of v$.website.$errors"
                            :key="error.$uid"
                            class="text-xs font-thin text-red-500"
                        >
                            {{ error.$message }}
                        </p>
                    </div>
                </div>
                <div class="flex justify-end mt-8">
                    <button
                        class="px-2 py-1 mr-2 font-normal text-white bg-red-600 rounded-lg shadow-sm text-md hover:bg-red-700 active:bg-red-900"
                        type="submit"
                        @click.prevent="clearForm"
                    >
                        Clear Fields
                    </button>
                    <button
                        class="px-2 py-1 font-normal text-white bg-blue-600 rounded-lg shadow-sm text-md hover:bg-blue-700 active:bg-blue-900"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
