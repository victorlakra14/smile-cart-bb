/* eslint-disable prettier/prettier */
import { memo, useState } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Alert, Typography } from "@bigbinary/neetoui";
import ProductQuantity from "components/commons/ProductQuantity";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({
  slug,
  imageUrl,
  offerPrice,
  mrp,
  name,
  availableQuantity,
}) => {
  const removeCartItems = useCartItemsStore.pickFrom();
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ availableQuantity, slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel="Yes, remove"
            title="Remove item?"
            message={
              <Typography>
                You are removing <strong>{name}</strong> from cart. Do you want
                to continue?
              </Typography>
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItems(slug);
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
