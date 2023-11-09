export const filteredList = (products,filters)=>{
    const fCSL=filteredListByCatSubCat(products,filters.category,filters.subCategory);
    const fCL=filteredListByColor(fCSL,filters.color);
    const fPL=filteredListByPrice(fCL,filters.min,filters.max);
    const fSL=filteredListByStock(fPL,filters.stock);
    const fEL=filteredListByEmboss(fSL,filters.emboss);
    const sL=sortListBy(fEL,filters.sort);
    return sL;
};

export const filteredListByCatSubCat = (products,category="",subCategory="")=>{
    var newProducts=products.filter(product=>product.category.toLowerCase()===category.toLowerCase());
    if(subCategory!=='All'){
        newProducts =  newProducts.filter(product=>product.subCategory.toLowerCase()===subCategory.toLowerCase());
    }
    return category!=='All'? newProducts : products;
}

export const filteredListByColor = (products,value="")=>{
    var newProducts = products.filter(product=> product.color.toLowerCase()===value.toLowerCase());
    return value!=='All'? newProducts : products;
};

export const filteredListByPrice = (products,min=0,max=0)=>{
    var newProducts = products.filter(product=> product.sp>=min && product.sp<=max);
    return newProducts;
};

export const filteredListByStock = (products,value=true)=>{
    var newProducts = products.filter(product=> product.quantity>0);
    return value ? products : newProducts;
};

export const filteredListByEmboss = (products,value=false)=>{
    var newProducts=products.filter(product=>product.emboss==='yes');
    return value ? newProducts :  products;
}

export const sortListBy = (products,value="")=>{
    if(value==='htl'){
        return products.sort((a, b) => (a.sp < b.sp ? 1 : -1));
    }else if(value==='lth'){
        return products.sort((a, b) => (a.sp > b.sp ? 1 : -1));
    }
    return products;
}