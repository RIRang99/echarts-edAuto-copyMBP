<script setup>
// import { useCounterStore } from '../stores/counter'
// const store = useCounterStore()
import { onMounted, ref } from "vue";
const divData = ref([
  { id: 1, text: "Box 1", isExpanded: false, isMinimized: false ,xyValue:'Linear/Log',dsValue:'Math Tansform'},
  { id: 2, text: "Box 2", isExpanded: false, isMinimized: false ,xyValue:'Linear/Log',dsValue:'Math Tansform'},
  { id: 3, text: "Box 3", isExpanded: false, isMinimized: false ,xyValue:'Linear/Log',dsValue:'Math Tansform'},
]);
const divHeight = ref();
const toggleMaximize = (id) => {
  divData.value.forEach((div) => {
    if (div.id === id) {
      div.isExpanded = true;
      div.isMinimized = false;
    } else {
      div.isExpanded = false;
      div.isMinimized = true;
    }
  });
};
const toggleMinimize = () => {
  divData.value.forEach((div) => {
    div.isExpanded = false;
    div.isMinimized = false;
  });
};
const handleSelect = (v,i) => {
  if(v==='默认值'){
    divData.value[i].xyValue = 'Linear/Log'
  }else{
    divData.value[i].xyValue = v
  }
};
const handleSelectDS = (v,i) => {
  if(v==='默认值'){
    divData.value[i].dsValue = 'Math Tansform'
  }else{
    divData.value[i].dsValue = v
  }
 
};
onMounted(() => {
  const a = Math.round(divData.value.length / 2);
  divHeight.value = 100 / a;
});
</script>
<template>
  <div class="chatMain">
    <div
      v-for="(div,i) in divData"
      :key="div.id"
      :class="[
        'box',
        { expanded: div.isExpanded },
        { hidden: div.isMinimized && !div.isExpanded },
      ]"
      :style="{ height: divHeight + '%' }"
    >
      <div class="toolBox">
        <div class="toolMenu">
          <a-dropdown @select="(value)=>handleSelectDS(value,i)" :popup-max-height="false">
            <a-button>{{ div.dsValue }} </a-button>
            <template #content>
              <a-doption>默认值</a-doption>
              <a-doption>y'</a-doption>
              <a-doption>y''</a-doption>
              <a-doption>y'''</a-doption>
            </template>
          </a-dropdown>
          <a-dropdown @select="(value)=>handleSelect(value,i)" :popup-max-height="false">
            <a-button>{{div.xyValue}} </a-button>
            <template #content>
              <a-doption>默认值</a-doption>
              <a-doption>x-lin, y-lin</a-doption>
              <a-doption>x-log, y-lin</a-doption>
              <a-doption>x-lin, y-log</a-doption>
              <a-doption>x-log, y-log</a-doption>
            </template>
          </a-dropdown>
        </div>
        <div class="toolButton">
          <div
            class="button"
            v-if="!div.isExpanded && !div.isMinimized"
            @click="toggleMaximize(div.id)"
          >
            ▲
          </div>
          <div
            class="button"
            v-if="div.isExpanded && !div.isMinimized"
            @click="toggleMinimize()"
          >
            ▼
          </div>
        </div>
      </div>
      <div class="oMain">
        <scatter-and-line :isExpanded="div.isExpanded" @isExpandedChanged="handleIsExpandedChanged" ></scatter-and-line>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.chatMain {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
.arco-btn-size-medium{
  height: 100%;
  border-right:1px solid gray ;
}
.box {
  width: 49.5%;
  // height: 60% !important;
  border: 1px solid black;
  margin: 10px 1% 0 0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  &:nth-child(2n) {
    margin-right: 0;
  }
  .oMain {
    height: calc(100% - 25px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.toolBox {
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid gray ;
}

.expanded {
  width: 100% !important;
  height: 100% !important;
  margin: 10px !important;
  z-index: 9999 !important;
}

.hidden {
  display: none;
}

.button {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
