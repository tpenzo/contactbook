<script>
    import ContactForm from "../components/ContactForm.vue";
    import ContactService from '../services/contact.service.js'
    export default {
        data() {
            return {
                contact: { name: '', email: '', address: '', phone: '', favorite: false }
            }
        },
        methods: {
            async submitContact(data){
                try {
                    await ContactService.create(data)
                    this.$router.push({ name: 'contactbook' })
                } catch (error) {
                    console.log(error)
                }
            }
        },
        components: {ContactForm}
    }
</script>

<template>
    <div class="page">
        <h4>THÊM MỚI LIÊN HỆ</h4>
       <ContactForm :contact="contact" @submit:contact="submitContact"/>
    </div>
</template>

<style></style>


