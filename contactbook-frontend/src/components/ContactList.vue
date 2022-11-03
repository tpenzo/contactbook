<script>
    export default {
        props: {
            contacts: { type: Array, defaule: []},
            activeIndex:{ type: Number, defaule: -1}
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index){
                this.$emit("update:activeIndex", index)
            }
        }
    }
</script>

<template>
    <ol class="list-group">
        <li class="list-group-item" :class="{ active: index === activeIndex }"
                v-for="(contact, index) in contacts" :key="index"
                @click="updateActiveIndex(index)">
            {{contact.name}}
        </li>
    </ol>
</template>

<style>
    
</style>
