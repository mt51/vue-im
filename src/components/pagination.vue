<template>
  <div class="page">
    <ul class="pagination">
      <li title="首页" @click="updateCurrentPage(1)" :class="{'disabled':currentPage === 1}">
        <span>&laquo;</span>
      </li>
      <li title="上一页" @click="prevPage" :class="{'disabled':currentPage === 1}">
        <span>&lt;</span>
      </li>
      <li v-for="item in page" class="page-item" :class="{'active': currentPage === item}" @click="updateCurrentPage(item)"><span>{{item}}</span></li>
      <li title="下一页" @click="nextPage" :class="{'disabled':currentPage === totalPage}">
        <span>&gt;</span>
      </li>
      <li title="尾页" @click="updateCurrentPage(totalPage)" :class="{'disabled':currentPage === totalPage}">
        <span>&raquo;</span>
      </li>
    </ul>
  </div>
</template>
<script>
/*
  total 总页数
  countPage 每页显示多少条
  showPageNum 显示几个分页按钮
  size 分页按钮大小
  page-change 分页变化事件名称

 */
  export default {
    name: 'pagination',
    props: {
      total: {
        type: Number,
        required: true
      },
      countPage: {
        type: Number,
        required: true
      },
      showPageNum: {
        type: Number,
        default: 5
      },
      size: {
        default: ''
      }
    },
    data () {
      return {
        totalPage: 1,
        currentPage: 1
      }
    },
    created () {
      this.totalPage = Math.ceil(this.total / this.countPage)
    },
    methods: {
      updateCurrentPage (item) {
        item = item < 1 ? 1 : item
        item = item > this.totalPage ? this.totalPage : item
        this.currentPage = item
        this.$emit('page-change', this.currentPage)
      },
      prevPage () {
        if (this.currentPage === 1) return
        this.updateCurrentPage(this.currentPage - 1)
      },
      nextPage () {
        if (this.currentPage === this.totalPage) return
        this.updateCurrentPage(this.currentPage + 1)
      }
    },
    computed: {
      page () {
        let pages = []
        if (this.currentPage < this.showPageNum) {
          let num = Math.min(this.totalPage, this.showPageNum)
          while (num) {
            pages.unshift(num--)
          }
        } else {
          let middle = this.currentPage - Math.floor(this.showPageNum / 2)
          let i = this.showPageNum
          if (middle > (this.totalPage - this.showPageNum)) {
            middle = this.totalPage - this.showPageNum + 1
          }
          while (i--) {
            pages.push(middle++)
          }
        }
        return pages
      }
    },
    watch: {
      total () {
        this.totalPage = Math.ceil(this.total / this.countPage)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page {
    width: 100%;
    &-item {
      &:hover {
        background: #e45050;
        color: #fff;
        border-color: #e45050;
        border-radius: none;
      }
    }
    .pagination {
      float: right;
      font-size: 0;
      border: 1px solid #ccc;
      margin: 0;
      padding: 0;
      li {
        cursor: pointer;
        font-size: 14px;
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: none;
        }
      }
      .active {
        background: #e45050;
        color: #fff;
        border-color: #e45050;
        border-radius: none;
      }
    }
    .disabled {
      cursor: not-allowed!important;
    }
  }
</style>