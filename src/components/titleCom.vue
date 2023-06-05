<script setup>
const oselect = ref("BSIM4.5");
const openFileInput = (index) => {
  document.getElementsByClassName("inputFile")[index].click();
};
const handleFileChange = (event, i) => {
  const formData = new FormData();
  const file = event.target.files[0];
  //   if (file) {
  //     formData.append("file", file);
  //     // 发送请求到后端
  //     api
  //       .post("/upload_file", formData)
  //       .then((res) => {
  //         content.value[i].pic = res.file_path;
  //         // let str ="http://192.168.1.155:8083/api/apc/user/data_manager/file?path=";
  //         let str = "http://127.0.0.1:8083/api/apc/user/data_manager/file?path=";
  //         content.value[i].src = str + res.file_name;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
};
</script>
<template>
  <div class="titleMain">
    <div class="logo">
      <img src="../assets/img/OIP.png" />
    </div>
    <div class="title">EDAutoSpice</div>
    <div class="function">
      <div class="tool">
        <a-select
          :style="{ width: '160px', marginRight: '20px' }"
          placeholder="Select"
          :trigger-props="{ autoFitPopupMinWidth: true }"
          v-model="oselect"
        >
          <a-option>BSIM4.5</a-option>
          <a-option>BSIM4.5</a-option>
        </a-select>
        <div style="margin-right: 20px">
          <input
            class="inputFile"
            type="file"
            style="display: none"
            @change="handleFileChange($event, index)"
            accept=".dat"
          />
          <a-button @click="openFileInput(0)" type="primary">导入数据</a-button>
        </div>
        <div>
          <input
            class="inputFile"
            type="file"
            style="display: none"
            @change="handleFileChange($event, index)"
            accept=".l"
          />
          <a-button @click="openFileInput(1)" type="primary"
            >导入model</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.titleMain {
  display: flex;
  height: 75px;
  .logo {
    width: 150px;
    height: 75px;
    img {
      width: 100%;
    }
  }
  .title {
    font-weight: bold;
    font-size: 30px;
    width: 200px;
    margin-top: 10px;
  }
  .function {
    flex: 1;
    height: 35px;
    margin-top: 35px;
    .tool {
      display: flex;
      float: right;
    }
  }
}
</style>
