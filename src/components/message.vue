<template>
  <transition name="message-fade">
    <div class="message" v-if="visible">
      <div class="message-wrapper alert" :class="'alert-' + type">
        <i class="fa fa-send"></i>
        <span>{{message}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'message',
    data () {
      return {
        type: 'success',
        message: '这是一条提示',
        visible: false,
        timer: null
      }
    },
    methods: {
      close () {
        this.clearTimer()
        setTimeout(() => {
          this.visible = false
          this.$el.parentNode.removeChild(this.$el)
          this.$destroy()
        }, 2000)
      },
      clearTimer () {
        clearTimeout(this.timer)
      }
    },
    mounted () {
      this.close()
    }
  }
</script>

<style lang="scss" scoped>
  .message {
    position: fixed;
    top: 60px;
    left:0;
    width: 100%;
    text-align: center;
    z-index: 999;
    &-wrapper {
      display: inline-block;
    }
    .alert {
      position: relative;
      padding: 0.75rem 1.25rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: 0.25rem;
    }

    .alert-heading {
      color: inherit;
    }

    .alert-link {
      font-weight: 700;
    }

    .alert-dismissible .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.75rem 1.25rem;
      color: inherit;
    }

    .alert-primary {
      color: #004085;
      background-color: #cce5ff;
      border-color: #b8daff;
    }

    .alert-primary hr {
      border-top-color: #9fcdff;
    }

    .alert-primary .alert-link {
      color: #002752;
    }

    .alert-secondary {
      color: #464a4e;
      background-color: #e7e8ea;
      border-color: #dddfe2;
    }

    .alert-secondary hr {
      border-top-color: #cfd2d6;
    }

    .alert-secondary .alert-link {
      color: #2e3133;
    }

    .alert-success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }

    .alert-success hr {
      border-top-color: #b1dfbb;
    }

    .alert-success .alert-link {
      color: #0b2e13;
    }

    .alert-info {
      color: #0c5460;
      background-color: #d1ecf1;
      border-color: #bee5eb;
    }

    .alert-info hr {
      border-top-color: #abdde5;
    }

    .alert-info .alert-link {
      color: #062c33;
    }

    .alert-warning {
      color: #856404;
      background-color: #fff3cd;
      border-color: #ffeeba;
    }

    .alert-warning hr {
      border-top-color: #ffe8a1;
    }

    .alert-warning .alert-link {
      color: #533f03;
    }

    .alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }

    .alert-danger hr {
      border-top-color: #f1b0b7;
    }

    .alert-danger .alert-link {
      color: #491217;
    }

    .alert-light {
      color: #818182;
      background-color: #fefefe;
      border-color: #fdfdfe;
    }

    .alert-light hr {
      border-top-color: #ececf6;
    }

    .alert-light .alert-link {
      color: #686868;
    }

    .alert-dark {
      color: #1b1e21;
      background-color: #d6d8d9;
      border-color: #c6c8ca;
    }

    .alert-dark hr {
      border-top-color: #b9bbbe;
    }

    .alert-dark .alert-link {
      color: #040505;
    }
  }
  .message-fade-enter-active {
    transition: all 0.5s;
  }
  .message-fade-enter, .message-fade-leave-to {
    top: 0;
    opacity: 0;
  }
</style>