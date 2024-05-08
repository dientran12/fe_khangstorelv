import React, { useEffect, useRef, useState } from 'react';

const ContentModalAddToCart = (productData) => {

    return (
        <div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                    {productData?.name || "Product added to cart"}
                </div>
                <div className="flex flex-col justify-between ">
                    quasndf qeu
                </div>

            </div>
        </div>
    );
};

export default ContentModalAddToCart;
