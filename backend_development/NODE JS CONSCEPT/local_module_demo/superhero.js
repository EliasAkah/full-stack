//module scope talks about each module is wrapped within an IIFE(immediately invoked function Element) which provides a private scope
//to it. enabling a function or variable to be used mutilple times without any conflict

//before a module is loaded it is wrapped within a iife function that contains five parameters namely
/*(function(exports, module, require, __filename, __dirname){
    //write a statement that is to be executeed.
})
    __filename => the filepath of the module(file) that is being executed. it changes as each module is executed within the main where it imported into
    __dirname => the directoryPath where the module(file) that is to be executed is located or found in.
    module => file that is being executed at a given period of time.
    exports{} => we speak about it later.
    require(path) => for importing module by path.
*/

require('./superman');
require('./batman');