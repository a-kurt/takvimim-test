(self.webpackChunktakvimim=self.webpackChunktakvimim||[]).push([[664],{8275:function(e,t,n){var r,a=n(2122).default,i=n(6690).default,l=n(9728).default,o=n(6115).default,u=n(1655).default,s=n(6389).default,c=n(4704).default,d=Object.create,f=Object.defineProperty,p=Object.getOwnPropertyDescriptor,h=Object.getOwnPropertyNames,m=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty,g=function(e,t,n,r){if(t&&"object"===typeof t||"function"===typeof t){var a,i=c(h(t));try{var l=function(){var i=a.value;y.call(e,i)||i===n||f(e,i,{get:function(){return t[i]},enumerable:!(r=p(t,i))||r.enumerable})};for(i.s();!(a=i.n()).done;)l()}catch(o){i.e(o)}finally{i.f()}}return e},b=function(e,t,n){return function(e,t,n){t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n}(e,"symbol"!==typeof t?t+"":t,n),n},v={};!function(e,t){for(var n in t)f(e,n,{get:t[n],enumerable:!0})}(v,{default:function(){return x}}),e.exports=(r=v,g(f({},"__esModule",{value:!0}),r));var k=function(e,t,n){return n=null!=e?d(m(e)):{},g(!t&&e&&e.__esModule?n:f(n,"default",{value:e,enumerable:!0}),e)}(n(2791)),w="64px",_={},x=function(e){"use strict";u(n,e);var t=s(n);function n(){var e;return i(this,n),e=t.apply(this,arguments),b(o(e),"mounted",!1),b(o(e),"state",{image:null}),b(o(e),"handleKeyPress",(function(t){"Enter"!==t.key&&" "!==t.key||e.props.onClick()})),e}return l(n,[{key:"componentDidMount",value:function(){this.mounted=!0,this.fetchImage(this.props)}},{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.url,r=t.light;e.url===n&&e.light===r||this.fetchImage(this.props)}},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"fetchImage",value:function(e){var t=this,n=e.url,r=e.light,a=e.oEmbedUrl;if(!k.default.isValidElement(r))if("string"!==typeof r){if(!_[n])return this.setState({image:null}),window.fetch(a.replace("{url}",n)).then((function(e){return e.json()})).then((function(e){if(e.thumbnail_url&&t.mounted){var r=e.thumbnail_url.replace("height=100","height=480").replace("-d_295x166","-d_640");t.setState({image:r}),_[n]=r}}));this.setState({image:_[n]})}else this.setState({image:r})}},{key:"render",value:function(){var e=this.props,t=e.light,n=e.onClick,r=e.playIcon,i=e.previewTabIndex,l=this.state.image,o=k.default.isValidElement(t),u={display:"flex",alignItems:"center",justifyContent:"center"},s={preview:a({width:"100%",height:"100%",backgroundImage:l&&!o?"url(".concat(l,")"):void 0,backgroundSize:"cover",backgroundPosition:"center",cursor:"pointer"},u),shadow:a({background:"radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",borderRadius:w,width:w,height:w,position:o?"absolute":void 0},u),playIcon:{borderStyle:"solid",borderWidth:"16px 0 16px 26px",borderColor:"transparent transparent transparent white",marginLeft:"7px"}},c=k.default.createElement("div",{style:s.shadow,className:"react-player__shadow"},k.default.createElement("div",{style:s.playIcon,className:"react-player__play-icon"}));return k.default.createElement("div",{style:s.preview,className:"react-player__preview",onClick:n,tabIndex:i,onKeyPress:this.handleKeyPress},o?t:null,r||c)}}]),n}(k.Component)}}]);
//# sourceMappingURL=reactPlayerPreview.8e82bcb5.chunk.js.map