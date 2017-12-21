<template>
  <div class="rs-pagination">
    <ul class="pagination" :class="pageSize">
      <li title="首页" @click="updateCurrentPage(1)" :class="{'disabled':currentPage === 1}">
        <a href="javascript:void(0)" class="previous">
          <span>&laquo;</span>
        </a>
      </li>
      <li title="上一页" @click="prevPage" :class="{'disabled':currentPage === 1}">
        <a href="javascript:void(0)" class="previous">
          <span>&lt;</span>
        </a>
      </li>
      <li v-for="item in page" :class="{'active': currentPage === item}" @click="updateCurrentPage(item)"><a href="javascript:void(0)">{{item}}</a></li>
      <li title="下一页" @click="nextPage" :class="{'disabled':currentPage === totalPage}">
        <a href="javascript:void(0)" class="next">
          <span>&gt;</span>
        </a>
      </li>
      <li title="尾页" @click="updateCurrentPage(totalPage)" :class="{'disabled':currentPage === totalPage}">
        <a href="javascript:void(0)" class="next">
          <span>&raquo;</span>
        </a>
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
      // showTotal: {
      //   type: Boolean,
      //   default: true
      // },
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
      },
      pageSize () {
        return (this.size === '' ? '' : 'pagination-' + this.size)
      }
    },
    watch: {
      total () {
        this.totalPage = Math.ceil(this.total / this.countPage)
      }
    }
  }
</script>