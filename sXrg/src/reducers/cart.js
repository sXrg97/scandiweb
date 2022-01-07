import {
  addToCart,
  removeFromCart,
  toggleCart,
  closeCart,
  updateImage,
} from "./actionNames";
import { isEqual } from "lodash";

const cart = (
  state = JSON.parse(window.localStorage.getItem("scandiwebCart")) || {
    isCartModalOpen: false,
    list: {
      variants: [],
    },
  },
  action
) => {
  switch (action.type) {
    case addToCart:
      let found = false;
      let addResult = [...state.list.variants];
      //Check if the product to be added to the cart is already existing in the cart with the same attributes
      state.list.variants.map((variant, idx) => {
        if (variant) {
          if (
            isEqual(variant.name, action.payload.name) &&
            isEqual(variant.attributes, action.payload.attributes)
          ) {
            let idx = state.list.variants.findIndex((oldVariant) =>
              isEqual(oldVariant.attributes, variant.attributes)
            );
            let newVariant = { ...variant };
            newVariant.amount += 1;
            addResult.splice(idx, 1, newVariant);
            found = true;
          }
        }
      });
      //
      //As we already increased the amount we just return the state
      if (found) {
        window.localStorage.setItem(
          "scandiwebCart",
          JSON.stringify({
            ...state,
            list: { variants: addResult },
          })
        );
        return {
          ...state,
          list: { variants: addResult },
        };
      }
      //If we didn't find the product, return the state and add the product to the state
      else {
        window.localStorage.setItem(
          "scandiwebCart",
          JSON.stringify({
            ...state,
            list: {
              variants: [
                ...state.list.variants,
                {
                  name: action.payload.name,
                  attributes: action.payload.attributes,
                  prices: action.payload.prices,
                  brand: action.payload.brand,
                  images: action.payload.images,
                  allAttributes: action.payload.allAttributes,
                  amount: 1,
                  selectedImage: 0,
                },
              ],
            },
          })
        );
        return {
          ...state,
          list: {
            variants: [
              ...state.list.variants,
              {
                name: action.payload.name,
                attributes: action.payload.attributes,
                prices: action.payload.prices,
                brand: action.payload.brand,
                images: action.payload.images,
                allAttributes: action.payload.allAttributes,
                amount: 1,
                selectedImage: 0,
              },
            ],
          },
        };
      }
    case removeFromCart:
      let newVariant;
      let removeResult = [...state.list.variants];
      //Check if the product to be added to the cart is already existing in the cart with the same attributes
      state.list.variants.map((variant) => {
        if (variant) {
          if (
            isEqual(variant.name, action.payload.name) &&
            isEqual(variant.attributes, action.payload.attributes)
            //  && variant.attributes[0].attribs.id ===
            // 	action.payload.attributes[0].attribs.id
          ) {
            newVariant = { ...variant };
            newVariant.amount -= 1;
            if (newVariant.amount < 1) {
              removeResult = removeResult.filter(
                (remVar) => !isEqual(remVar, variant)
              );
            } else {
              let idx = state.list.variants.findIndex((eachVar) =>
                isEqual(eachVar, variant)
              );
              removeResult.splice(idx, 1, newVariant);
            }
          }
        }
      });
      window.localStorage.setItem(
        "scandiwebCart",
        JSON.stringify({
          ...state,
          list: { variants: removeResult },
        })
      );
      return {
        ...state,
        list: { variants: removeResult },
      };
    case closeCart:
      return {
        ...state,
        isCartModalOpen: false,
      };
    case toggleCart:
      return {
        ...state,
        isCartModalOpen: !state.isCartModalOpen,
      };
    case updateImage:
      switch (action.payload.increase) {
        case false: {
          let id = null;
          let newVariant = null;
          state.list.variants.map((stateElem, idx) => {
            if (isEqual(stateElem, action.payload.variant)) id = idx;
          });
          if (id !== null) newVariant = { ...state.list.variants[id] };
          newVariant.selectedImage--;
          if (newVariant.selectedImage < 0) {
            newVariant.selectedImage = newVariant.images.length - 1;
          }
          if (newVariant !== null) {
            let newVariants = [...state.list.variants];
            newVariants.splice(id, 1, newVariant);
            window.localStorage.setItem(
              "scandiwebCart",
              JSON.stringify({
                ...state,
                list: { variants: newVariants },
              })
            );
            return {
              ...state,
              list: { variants: newVariants },
            };
          }
          window.localStorage.setItem(
            "scandiwebCart",
            JSON.stringify({ ...state })
          );
          return { ...state };
        }
        case true: {
          let id = null;
          let newVariant = null;
          state.list.variants.map((stateElem, idx) => {
            if (isEqual(stateElem, action.payload.variant)) id = idx;
          });
          if (id !== null) newVariant = { ...state.list.variants[id] };
          newVariant.selectedImage++;
          if (newVariant.selectedImage > newVariant.images.length - 1) {
            newVariant.selectedImage = 0;
          }
          if (newVariant !== null) {
            let newVariants = [...state.list.variants];
            newVariants.splice(id, 1, newVariant);
            window.localStorage.setItem(
              "scandiwebCart",
              JSON.stringify({
                ...state,
                list: { variants: newVariants },
              })
            );
            return {
              ...state,
              list: { variants: newVariants },
            };
          }
          window.localStorage.setItem(
            "scandiwebCart",
            JSON.stringify({ ...state })
          );
          return { ...state };
        }
        default:
          window.localStorage.setItem(
            "scandiwebCart",
            JSON.stringify({ ...state })
          );
          return {
            ...state,
          };
      }
    //
    //As we already increased the amount we just return the state
    //If we didn't find the product, return the state and add the product to the state
    // case clearCart:
    //   return {
    //     ...state,
    //     selectedCurrency: action.payload.currency,
    //   };
    default:
      window.localStorage.setItem(
        "scandiwebCart",
        JSON.stringify({ ...state })
      );
      return {
        ...state,
      };
  }
};

export default cart;
