<style>
    @import 'css/main.css';
</style>

<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <!-- <div class="close-all-tag-con">
            <Dropdown transfer @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div> -->
        <div ref="scrollBody" class="tags-inner-scroll-body" :class="shrink == true ? 'scrollPaddingL' : 'tags-inner-scroll-body'" >
            <transition-group name="taglist-moving-animation">
                <Tag
                    type="dot"
                    v-for="(item) in tagsList"
                    ref="tagsPageOpened"
                    :key="item.name" 
                    :name="item.name" 
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.name==='home'?false:true"
                    :color="item.name===currentPageName?'primary':'default'"
                    
                >
                <span :class="item.name===currentPageName?'tag-active':''">{{ itemTitle(item) }}</span>
                
                </Tag>
            </transition-group>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { getNextRoute } from "@/assets/util"
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            refsTag: [],
            tagsCount: 1
        };
    },
    props: {
        // pageTagsList: Array,
        beforePush: {
            type: Function,
            default: (item) => {
                return true;
            }
        },
        shrink: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tagsList () {
            return this.$store.state.app.tagList
        },
        currentPageName () {
            return this.$route.name
        }
    },
    methods: {
        itemTitle (item) {
            return item.title


            // if (typeof item.title === 'object') {
            //     return this.$t(item.title.i18n);
            // } else {
            //     var tit;
            //     if(item.name!==this.currentPageName && item.title.length>4){
            //         tit = item.title.substring(0,4)+"...";
            //     }else{
            //         tit = item.title;
            //     }
            //     return tit;
            // }
        },
        closePage (event, name) {
            this.$store.commit("removeTag",name);
            const nextRoute = getNextRoute();
            this.$router.push({name: nextRoute.name});
        },
        linkTo (item) {
            // 关闭标签页面时，不进行设置iframe操作
            // if(!isClose){
            //     if(item.isFrame == 1){
            //         this.$store.commit('setIframeParam',{'isShowIframe': true,'url': item.url,'isFrame':item.isFrame});
            //     }else{
            //         this.$store.commit('setIframeParam',{'isShowIframe': false});
            //     }
            // }

            // let routerObj = {};
            // routerObj.name = item.name;
            // if (item.argu) {
            //     routerObj.params = item.argu;
            // }
            // if (item.query) {
            //     routerObj.query = item.query;
            // }
            // if (this.beforePush(item)) {
            //     this.$router.push(routerObj);
            // }
            if(!item.url){
                this.$store.commit("setIframe",{});
            }else{
                this.$store.commit("setIframe",{
                    name: item.name,
                    url: item.url
                });
            }
            this.$router.push({name: item.name});
            
        },
        handlescroll (e) {
            var type = e.type;
            let delta = 0;
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
            }
            let left = 0;
            if (delta > 0) {
                left = Math.min(0, this.tagBodyLeft + delta);
            } else {
                if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                    if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                        left = this.tagBodyLeft;
                    } else {
                        left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                    }
                } else {
                    this.tagBodyLeft = 0;
                }
            }
            this.tagBodyLeft = left;
        },
        handleTagsOption (type) {
            if (type === 'clearAll') {
                this.$store.commit('clearAllTags');
                this.$router.push({
                    name: 'home_index'
                });
            } else {
                this.$store.commit('clearOtherTags', this);
            }
            this.tagBodyLeft = 0;
        },
        moveToView (tag) {
            if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + 10;
            } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
                // 标签在可视区域
                this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
            }
        }
    },
    mounted () {
        // this.refsTag = this.$refs.tagsPageOpened;
        // setTimeout(() => {
        //     this.refsTag.forEach((item, index) => {
        //         if (this.$route.name === item.name) {
        //             let tag = this.refsTag[index].$el;
        //             this.moveToView(tag);
        //         }
        //     });
        // }, 1); // 这里不设定时器就会有偏移bug
        // this.tagsCount = this.tagsList.length;
    },
    watch: {
        '$route' (to) {
            return this.$store.state.app.tagList
        }
    }
};
</script>
