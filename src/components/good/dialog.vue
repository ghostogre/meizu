<template>
  <div class="dialog-mask">
    <div class="dialog-box">
      <div class="dialog-wrapper">
        <div class="dialog-header">
          弹框
          <i class="icon-font icon-close dialog-close"></i>
        </div>
        <div class="dialog-content">
          确定删除吗？
        </div>
        <div class="dialog-footer">
          <div class="btn success mr20 wd100">确定</div>
          <div class="btn cancel wd100">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog'
}
</script>

<style lang="scss" scoped>
.dialog-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(153, 153, 153, .6);
  display: table;

  .dialog-box {
    display: table-cell;
    vertical-align: middle;
  }

  .dialog-wrapper {
    margin: 0 auto;
    background-color: white;
    text-align: center;
    width: 500px;
  }

  .dialog-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px 4px 0 0;
    position: relative;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #efefef;
  }

  .dialog-close {
    position: absolute;
    right: 26px;
    top: 16px;
    color: #bdbdbd;
  }

  .dialog-content {
    height: 120px;
    line-height: 120px;
  }

  .dialog-footer {
    padding-bottom: 20px;
  }

  .mr20 {
    margin-right: 20px;
  }

  .wd100 {
    width: 100px;
  }
}
</style>
