<script setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
const demoData = store.demoData;
const paramData = demoData.param;
const n15Data = demoData.subckt.param;
const n15DataModel = demoData.subckt.model;
console.log(n15DataModel)
const odata = ref([]);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    slotName: "Name",
  },
  {
    title: "Value",
    dataIndex: "value",
    slotName: "Value",
  },
  {
    title: "Lower",
    dataIndex: "lower",
    slotName: "Lower",
  },
  {
    title: "Upper",
    dataIndex: "upper",
    slotName: "Upper",
  },
  {
    title: "Step",
    dataIndex: "step",
    slotName: "Step",
  },
];
const dName = demoData.subckt.name
const treeData = [
  {
    title: "Demo",
    key: "0-0",
    children: [
      {
        title: "param",
        key: "0-0-0",
      },
      {
        title: dName + '@param',
        key: "0-0-1",
      },
      {
        title: dName + '@model',
        key: "0-0-2",
        children: [
        ],
      },
    ],
  },
];
if(n15DataModel){
    for(let i=0;i<=Object.keys(n15DataModel).length;i++){
        treeData[0].children[2].children.push({
            title:Object.keys(n15DataModel)[i],
            key:'0-0-2-'+i
        })
   }
}

const selectedKey = ref("0-0-0");
const selectTree = (selectedKeys, data) => {
  selectedKey.value = selectedKeys[0];
  if (data.node.title == dName + '@param') {
    odata.value = n15Data;
  } else if (data.node.title == "param") {
    odata.value = paramData;
  } else if(data.node.title == dName + '@model') {
    selectedKey.value = '0-0-2-0';
    odata.value = n15DataModel[Object.keys(n15DataModel)[0]];
  }else{
    odata.value = n15DataModel[data.node.title];
  }
};
onMounted(() => {
  odata.value = paramData;
});
</script>
<template>
  <div class="tableMain">
    <div class="tree">
      <a-tree
        blockNode
        :data="treeData"
        :selected-keys="selectedKey"
        @select="selectTree"
      />
    </div>
    <div class=""></div>
    <div class="table">
      <a-table :columns="columns" :data="odata" :pagination="false">
        <!-- <template #Name="{ record, rowIndex }">
          <a-input v-model="record.name" />
        </template> -->
        <template #Value="{ record, rowIndex }">
          <a-input v-model="record.value" />
        </template>
        <template #Lower="{ record, rowIndex }">
          <a-input v-model="record.lower" />
        </template>
        <template #Upper="{ record, rowIndex }">
          <a-input v-model="record.upper" />
        </template>
        <template #Step="{ record, rowIndex }">
          <a-input v-model="record.step" />
        </template>
      </a-table>
    </div>
  </div>
</template>
<style lang="scss">
.tableMain {
  height: 100%;
  display: flex;
  //   overflow-y: scroll;
  .tree {
    width: 15%;
  }
  .table {
    flex: 1;
  }
}
.arco-table .arco-table-cell{
    padding: 4px 8px;
}
</style>
