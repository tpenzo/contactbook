<script>
    import ContactForm from "../components/ContactForm.vue";
    import ContactService from '../services/contact.service.js'
    export default {
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact(){
            try {
                this.contact = await ContactService.get(this.id)
            } catch (error) {
                console.log(error)
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateContact(data) {
            try {
                await ContactService.update(this.id, data)
                this.message = "Liên hệ được cập nhật thành công.";
                this.$router.push({ name: 'contactbook' })
            } catch (error) {
                console.log(error)
            }
        },
        async deleteContact() {
            try {
                await ContactService.delete(this.id)
                this.$router.push({ name: 'contactbook'})
            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        this.getContact()
        this.message = ""
    },
    components: { ContactForm }
}
</script>
<template>
    <div v-if="contact" class="page">
        <h4>HIỆU CHỈNH LIÊN HỆ</h4>
        <ContactForm :contact="contact" @submit:contact="updateContact" @delete:contact="deleteContact" />
        <p>{{ message }}</p>
    </div>
</template>
<style></style>


