macro class {
  case $className:ident { 
    constructor $constParam $constBody
    $($methodName:ident $methodParam $methodBody) ... } => {

    function $className $constParam $constBody

    $($className.prototype.$methodName 
      = function $methodName $methodParam $methodBody; ) ...
  }
}
