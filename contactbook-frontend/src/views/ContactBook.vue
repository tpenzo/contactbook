<script>
    import InputSearch from '../components/InputSearch.vue';
    import ContactCard from '../components/ContactCard.vue';
    import ContactList from '../components/ContactList.vue';
    import ContactService from '../services/contact.service.js'
    export default {
        components: { InputSearch, ContactCard, ContactList },
        data() {
            return {
                contacts: [],
                activeIndex: -1,
                searchText: ""
            }
        },
        watch: {
            searchText(){
                this.activeIndex = -1
            }
        },
        computed: {
            contactStrings() {
                return this.contacts.map((contact) => {
                    const { name, email, address, phone } = contact;
                    return [name, email, address, phone].join("");
                });
            }, 
            filteredContacts() {
                if (!this.searchText) 
                    return this.contacts;
                return this.contacts.filter((_contact, index) =>
                    this.contactStrings[index].includes(this.searchText)
                );
            },
            activeContact() {
                if (this.activeIndex < 0) 
                    return null;
                return this.filteredContacts[this.activeIndex];
            },
            filteredContactsCount() {
                return this.filteredContacts.length;
            },
        },
        methods: {
            async retrieveContacts() {
                try {
                    this.contacts = await ContactService.getAll();
                } catch (error) {
                    console.log(error)
                }
            },
            async removeContacts() {
                if(confirm("Bạn có muốn xóa tất cả liên hệ ?")){
                    try {
                        await ContactService.deleteAll();
                        this.refreshList()
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            refreshList() {
                this.retrieveContacts();
                this.activeIndex = -1;
            },
            goToAddContact(){
                this.$router.push({ name: "contact.add" })
            }
        },

        mounted () {
            this.refreshList();
        }
    }
</script>

<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model:searchText="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h5 class="title">
                <i class="fas fa-address-book"></i> &nbsp;
                DANH BẠ
            </h5>
            <hr/>
            <div class="row">
                <div class="col-4">
                    <div class="btn-group-vertical">
                        <button class="btn btn-sm btn-primary btn-style" @click="refreshList()">
                            <i class="fas fa-redo"></i> Làm mới
                        </button>
                        <button class="btn btn-sm btn-success btn-style mt-1 mb-1" @click="goToAddContact()">
                            <i class="fas fa-plus"></i> Thêm mới
                        </button>
                        <button class="btn btn-sm btn-danger btn-style" @click="removeContacts()">
                            <i class="fas fa-trash"></i> Xóa tất cả
                        </button>
                    </div>
                </div>
                <div class="col-8">
                    <ContactList v-if="filteredContactsCount" 
                        :contacts="filteredContacts" 
                        v-model:activeIndex="activeIndex"/>
                    <p style="color: red;" v-else>Không có liên hệ nào.</p>
                </div>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div class="contactDetails" v-if="activeContact">
                <h4>
                    <i class="fas fa-address-card"></i> &nbsp;
                    CHI TIẾT LIÊN HỆ
                </h4>
                <hr/>
                <ContactCard :contact="activeContact"/>
                <router-link :to="{ name: 'contact.edit', params:{ id: activeContact._id}}">
                    <span class="mt-2 badge badge-warning" style="padding: 5px">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
.page {
        text-align: left;
        max-width: 750px;
    }
    .contactDetails{
        border: 5px double;
        border-radius: 20px 10px;
        padding: 10px;
    }
    .title{
        background: ghostwhite;
        border: 0.5px solid;
        border-radius: 5px 10px;
        padding: 8px;
    }
    .btn-style{
        width: 100px;
        border-radius: 5px 10px;
    }
</style>