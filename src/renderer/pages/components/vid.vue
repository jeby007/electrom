<template>
  <div class="aiVid rotateVid">
    <video :src="vidSrc" :autoplay="true" id="vidplayer" @ended="end" loop/>
    <div class="vidMask" @click="event" v-if="isShowMask" :style="{top:list[clickNum].mask.top,left:list[clickNum].mask.left,width:list[clickNum].mask.w,height:list[clickNum].mask.h}"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        vo:'',
        time: {},
        vidSrc:require('../../../os/cVid/OLED-FINAL-1216.mp4'),
        list:[
          {
            start: 10,
            end: 15,
            play:15,
            mask:{
              top:'18%',
              left:'46%',
              w:'29%',
              h:'60%'
            }
          },
          {
            start: 42,
            end: 57,
            play:57,
            mask:{
              top:'28%',
              left:'41%',
              w:'11%',
              h:'42%'
            }
          },
          {
            start: 66,
            end: 81.5,
            play:81.5,
            mask:{
              top:'28%',
              left:'45%',
              w:'10%',
              h:'44%'
            }
          },
          {
            start: 107,
            end: 116.5,
            play:116.5,
            mask:{
              top:'4%',
              left:'43%',
              w:'16%',
              h:'85%'
            }
          }
        ],
        clickNum:0,
        isShowMask:false,
      }
    },
    mounted(){
      let _self = this
      this.$nextTick(()=>{
        _self.vo = document.getElementById("vidplayer")
        _self.vo.ontimeupdate = (e) => {
          //console.info(_self.vo.currentTime);
          if(_self.vo.currentTime <=2){
            _self.time = _self.list[0]
            _self.fun = _self.loop
          }
          _self.fun()
        };
       setTimeout(()=>{
         _self.vo.play()
       },1000)
      })
      //this.regMenus()
    },
    methods: {
      loop(){
        //console.info("loop",this.time.end);
        if(this.vo.currentTime >= this.time.start){
          this.isShowMask = true;//隐藏mask
        }
        if(this.vo.currentTime > this.time.end) {
          this.vo.currentTime = this.time.start;
        }
      },
      event(){
        this.isShowMask = false;//隐藏mask
        this.vo.currentTime = this.time.play;
        this.clickNum++;
        if(this.clickNum >= this.list.length){
          this.clickNum = 0;
          this.fun = ()=>{};
        }else{
        }
        this.time = this.list[this.clickNum];
      },
      end(){
        alert(11)
      }
    }
  }
</script>

<style scoped>
  .aiVid{width: 100%;height:100%;position: fixed;top: 0;left: 0;z-index: 5;background: rgba(0,0,0,.8)}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  #vidplayer{transform: rotate(-90deg) scale(1.8);width: 100%;height: 100%;}
  @keyframes upToDown {
    from{transform: translateY(10px) scale(1.2);opacity: .5}
    to{transform: translateY(0);opacity: .5}
  }
  .vidMask{position: absolute;top: 18%;left: 46%;width: 29%;height: 60%;}
  @keyframes move {
    from {transform: translate(0,0) rotate(-90deg)}
    to {transform: translate(-10px,-10px) rotate(-90deg)}
  }
</style>
