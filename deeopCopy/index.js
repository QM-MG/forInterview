function cloneDeep4(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    // 解决循环引用 a.b = a
    if (hash.has(source)) return hash.get(source); 
    let target = Array.isArray(source) ? [] : {};
    hash.set(source, target);
    // 复制symbol
    let symKeys = Object.getOwnPropertySymbols(source); // 查找
    if (symKeys.length) { // 查找成功	
        symKeys.forEach(symKey => {
            if (isObject(source[symKey])) {
                target[symKey] = cloneDeep4(source[symKey], hash); 
            } else {
                target[symKey] = source[symKey];
            }    
        });
    }
    for(let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = cloneDeep4(source[key], hash); 
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

