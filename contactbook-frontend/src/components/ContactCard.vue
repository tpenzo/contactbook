<script>
    export default {
        props: {
            contact: {type: Object, required: true}
        }
    }
</script>
<template>
    <div>
        <div class="p-1">
            <i class="fa-solid fa-user-pen"></i>&nbsp;
            <strong>Tên:</strong> {{ contact?.name }}
            </div>
        <div class="p-1">
            <i class="fa-solid fa-envelope"></i>&nbsp;
            <strong>E-mail:</strong> {{ contact?.email }}
        </div>
        <div class="p-1">
            <i class="fa-solid fa-location-pin"></i>&nbsp;
            <strong>Địa chỉ:</strong> {{ contact?.address }}
        </div>
        <div class="p-1">
            <i class="fa-solid fa-phone"></i>&nbsp;
            <strong>Điện thoại:</strong> {{ contact?.phone }}
        </div>
        <div class="p-1">
            <i class="fa-solid fa-heart"></i>&nbsp;
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="contact?.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>
<style scoped>
    
</style>

