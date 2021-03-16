

/**
 * 事件函数
 * @date 2020-03-13
 * @param {any} 默认的触发回调函数
 * @returns {event} 事件对象
 */
var eventBox = function(func){
	
    var data = [];
    
    var retFunc = func;

    var ret = function(func,bool){

        if(typeof func === "function" && !bool){
            
            data.push(func);
            
            func.remove = function(){
                data.splice(data.indexOf(func),1);
                return this;
            }
            func.setIndex = function(index){
                this.index = index;
                return this;
            }
            func.index = 0;
            
            ret.onaddFunction && ret.onaddFunction(func);
            
            return func;

        }

        retFunc && retFunc.apply(this,arguments);

        data.sort(function(a,b){ return a.index < b.index });

        for( var i = 0 ; i < data.length; i++ ){

            var it = data[i];

            
            it && ( it.apply(this,arguments) === 'remove' ) && it.remove();	
            
            ret.ontrigger && ret.ontrigger(it);
            
            if( data.indexOf(it) == -1 ) --i;
    
        };
    
    }
    
    ret.remove = function(){
        data = [];
    };
    
    ret.getFunction = function(){ 
        return data; 
    }
    
    ret.onaddFunction = null;
    ret.ontrigger = null;

    return ret;
    
}

module.exports = eventBox ;
