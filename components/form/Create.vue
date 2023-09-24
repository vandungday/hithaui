<script setup lang="ts">
import { useFormsStore } from '~/stores/forms'
import type { CreateForm } from '~/types'
const { createForm } = useFormsStore()

const emit = defineEmits<{
    (e: 'close-form-drawer'): void
    (e: 'create-form'): void
}>()

const coverImagePreviewUrl = ref<string>('')
const createFormBody = reactive<CreateForm>({
    name: '',
    eventId: 1,
    coverImage: '',
})

function resetCreateForm() {
    createFormBody.name = ''
    createFormBody.eventId = 1
    createFormBody.coverImage = ''
}

async function handleCreateForm() {
    const { name, eventId, coverImage } = createFormBody
    const fields = [name, eventId, coverImage]
    const isValid = fields.every((field) => Boolean(field) === true)

    if (!isValid) {
        return useNotification({
            message: 'Please fill all fields',
            type: 'error',
        })
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('eventId', eventId.toString())
    formData.append('coverImage', coverImage as Blob)

    await createForm(formData)

    emit('create-form')
    emit('close-form-drawer')
    resetCreateForm()

    return useNotification({
        message: 'Create form successfully',
        type: 'success',
    })
}

function onCoverImageChange(e: Event) {
    createFormBody.coverImage = (e.target as HTMLInputElement)
        .files?.[0] as File
    coverImagePreviewUrl.value = URL.createObjectURL(createFormBody.coverImage)
}
</script>

<template>
    <form class="form" action="">
        <div class="form-item">
            <label for="name" class="label">Name</label>
            <input
                id="name"
                v-model="createFormBody.name"
                type="text"
                class="input"
            />
        </div>
        <div class="form-item">
            <label for="event" class="label">Event</label>
            <select id="event" v-model="createFormBody.eventId" class="input">
                <option class="select-option" value="1">
                    Tuyển thành viên
                </option>
                <option class="select-option" value="2">
                    Sinh nhật HIT lần 13
                </option>
                <option class="select-option" value="3">
                    Trung thu cho em
                </option>
            </select>
        </div>
        <div class="form-item">
            <label class="label">Image Cover</label>
            <div class="file-upload">
                <label for="image-cover" class="dropzone">
                    <div class="content">
                        <template v-if="!createFormBody.coverImage">
                            <Icon name="uil:cloud-upload" class="icon" />
                            <p class="description">
                                <span class="font-semibold"
                                    >Click to upload</span
                                >
                                or drag and drop
                            </p>
                            <p class="extra">
                                PNG, JPG or JPEG (MAX. 800x400px)
                            </p>
                        </template>
                        <template v-else class="content">
                            <div class="preview">
                                <img
                                    :src="coverImagePreviewUrl"
                                    alt="cover-images-preview"
                                />
                                <span>{{
                                    (createFormBody.coverImage as File).name
                                }}</span>
                            </div>
                        </template>
                    </div>
                    <input
                        @change="onCoverImageChange"
                        id="image-cover"
                        type="file"
                        class="input"
                    />
                </label>
            </div>
        </div>
        <div class="form-item -actions">
            <button
                type="button"
                class="cancel-button"
                @click="emit('close-form-drawer')"
            >
                Cancel
            </button>
            <button
                type="button"
                class="submit-button"
                @click="handleCreateForm"
            >
                Save
            </button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form {
    @apply mb-4;

    > .form-item {
        @apply mb-4;
    }

    > .form-item > .input {
        @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg;
        @apply focus:ring-primary-500 focus:border-primary-500 focus:outline-primary-500 block w-full p-2.5;
    }

    > .form-item > .label {
        @apply block mb-2 text-sm font-medium text-gray-900;
    }

    > .form-item > .select-option {
        @apply p-1.5 text-sm text-gray-900;
    }

    > .form-item.-actions {
        @apply text-right;
    }

    > .form-item > .file-upload {
        @apply flex items-center justify-center w-full;

        > .dropzone {
            @apply flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100;
        }

        > .dropzone > .content {
            @apply flex flex-col items-center justify-center pt-5 pb-6;
        }

        > .dropzone > .content > .icon {
            @apply w-8 h-8 mb-2 text-gray-500;
        }

        > .dropzone > .content > .description {
            @apply mb-2 text-sm text-gray-500;
        }

        > .dropzone > .content > .extra {
            @apply text-xs text-gray-500;
        }
        > .dropzone > .content > .preview {
            @apply w-[50%] flex flex-col gap-2 items-center;
        }

        > .dropzone > .input {
            @apply hidden;
        }
    }

    > .form-item > .submit-button {
        @apply text-white bg-primary-500 font-medium rounded-lg text-sm px-5 py-2.5 ml-2;
        @apply hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 focus:outline-none;
    }

    > .form-item > .cancel-button {
        @apply text-gray-900 bg-white border border-gray-300 text-sm font-medium rounded-lg px-5 py-2.5;

        @apply focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200;
    }
}
</style>
