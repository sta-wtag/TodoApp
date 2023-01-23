<template>
    <div class="card">
      <div class="cardDescription">{{ cardData.description }}</div>
      <div class="caption textMargin">{{ cardData.createdAt }}</div>
      <div class="box">
        <div>
          <TickButton />
        </div>
        <div>
          <EditButton />
        </div>
        <div>
          <DeleteButton />
        </div>
      </div>
    </div>
</template>
 <script>
import DeleteButton from './buttons/DeleteButton.vue';
import EditButton from './buttons/EditButton.vue';
import TickButton from './buttons/TickButton.vue';
export default {
    name: "TaskCard",
    props: {
        cardData: {
            type: Object,
            default: null
        }
    },
    components: { EditButton, TickButton, DeleteButton }
}
</script>
<style scoped>
.textMargin {
  margin-top:9px; 
}
.box{
  display:flex; 
  gap:8px;
}
</style>
