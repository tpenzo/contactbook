<script>
export default {
    props: {
        searchText: {type: String, default: ""}
    },
    emits: ['update:searchText', 'submit'],
    methods: {
        updateSearchText(e){
            this.$emit('update:searchText', e.target.value)
        },
        submit(){
            this.$emit('submit')
        }
    },
}
</script>

<template>
<div class="input-group">
    <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" 
        :value="searchText" @input="updateSearchText" @keyup.enter="submit"/>
    <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="submit">
            <i class="fas fa-search"></i> Tìm kiếm
        </button>
    </div>
</div>
</template>

<style>
    
</style>