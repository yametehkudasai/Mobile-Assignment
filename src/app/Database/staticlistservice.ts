import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Staticlistservice {

  // complete product list - with categories
  product: {
    Id: number,
    Image: string,
    ProductName: string,
    Price: number,
    BackgroundColor: string,
    Ingredientlist: string,
    Description: string,
    category: string
  }[]
    = [
      // Pizza filter
      {
        Id: 1,
        Image: "/assets/images/pizza.png",
        ProductName: "Classic Pepperoni Pizza",
        Price: 12.99,
        BackgroundColor: "#FF8B67",
        Ingredientlist: "Pepperoni, Mozzarella Cheese, Tomato Sauce, Italian Herbs",
        Description: "Traditional pepperoni pizza with generous toppings",
        category: "Pizza"
      },
      {
        Id: 2,
        Image: "/assets/images/pizza1.png",
        ProductName: "Supreme Pizza",
        Price: 14.99,
        BackgroundColor: "#FFB84D",
        Ingredientlist: "Pepperoni, Mushrooms, Bell Peppers, Onions, Olives, Sausage",
        Description: "Loaded with premium toppings for pizza lovers",
        category: "Pizza"
      },
      {
        Id: 3,
        Image: "/assets/images/pizza2.png",
        ProductName: "Meat Lovers Pizza",
        Price: 15.99,
        BackgroundColor: "#E74C3C",
        Ingredientlist: "Pepperoni, Sausage, Bacon, Ham, Ground Beef",
        Description: "For true meat lovers - packed with protein",
        category: "Pizza"
      },
      // Burger filter
      {
        Id: 4,
        Image: "/assets/images/burger1.png",
        ProductName: "Classic Cheeseburger",
        Price: 9.99,
        BackgroundColor: "#F39C12",
        Ingredientlist: "Beef Patty, Cheddar Cheese, Lettuce, Tomato, Pickles, Special Sauce",
        Description: "Juicy beef burger with melted cheese",
        category: "Burger"
      },
      {
        Id: 5,
        Image: "/assets/images/burger2.png",
        ProductName: "Bacon Deluxe Burger",
        Price: 11.99,
        BackgroundColor: "#D35400",
        Ingredientlist: "Beef Patty, Bacon, Cheese, Lettuce, Onion Rings, BBQ Sauce",
        Description: "Double patty with crispy bacon",
        category: "Burger"
      },
      {
        Id: 6,
        Image: "/assets/images/burger3.png",
        ProductName: "Crispy Chicken Burger",
        Price: 10.99,
        BackgroundColor: "#E67E22",
        Ingredientlist: "Crispy Chicken, Lettuce, Tomato, Mayo, Pickles",
        Description: "Crispy fried chicken with fresh vegetables",
        category: "Burger"
      },
      // Sushi filter
      {
        Id: 7,
        Image: "/assets/images/sushi1.png",
        ProductName: "Sushi Platter",
        Price: 18.99,
        BackgroundColor: "#3498DB",
        Ingredientlist: "Salmon, Tuna, Avocado, Cucumber, Rice, Nori",
        Description: "Assorted sushi with fresh fish and vegetables",
        category: "Sushi"
      },
      // Bibimbap filter
      {
        Id: 8,
        Image: "/assets/images/bibimbap.png",
        ProductName: "Bibimbap Bowl",
        Price: 13.99,
        BackgroundColor: "#16A085",
        Ingredientlist: "Rice, Vegetables, Beef, Egg, Gochujang Sauce",
        Description: "Korean rice bowl with mixed vegetables",
        category: "Bibimbap"
      },
      // Ramen filter
      {
        Id: 9,
        Image: "/assets/images/spicyramen.png",
        ProductName: "Spicy Ramen",
        Price: 12.99,
        BackgroundColor: "#E74C3C",
        Ingredientlist: "Noodles, Egg, Vegetables, Spicy Sauce, Green Onion",
        Description: "Delicious spicy ramen with fresh vegetables",
        category: "Ramen"
      },
      {
        Id: 10,
        Image: "/assets/images/misoramen.png",
        ProductName: "Miso Ramen",
        Price: 13.99,
        BackgroundColor: "#D68910",
        Ingredientlist: "Noodles, Pork, Miso Paste, Green Onion, Egg, Corn",
        Description: "Traditional miso ramen with tender pork",
        category: "Ramen"
      },
      {
        Id: 11,
        Image: "/assets/images/seafoodramen.png",
        ProductName: "Seafood Ramen",
        Price: 15.99,
        BackgroundColor: "#1ABC9C",
        Ingredientlist: "Noodles, Shrimp, Squid, Vegetables, Egg",
        Description: "Fresh seafood ramen with premium ingredients",
        category: "Ramen"
      },
      {
        Id: 12,
        Image: "/assets/images/chickenramen.png",
        ProductName: "Chicken Ramen",
        Price: 11.99,
        BackgroundColor: "#F39C12",
        Ingredientlist: "Noodles, Chicken, Vegetables, Egg, Broth",
        Description: "Hearty chicken ramen with savory broth",
        category: "Ramen"
      },
      {
        Id: 13,
        Image: "/assets/images/vegetarianramen.png",
        ProductName: "Vegetarian Ramen",
        Price: 10.99,
        BackgroundColor: "#27AE60",
        Ingredientlist: "Noodles, Tofu, Mixed Vegetables, Mushrooms, Carrots, Spinach",
        Description: "Healthy vegetarian ramen packed with nutrients",
        category: "Ramen"
      },

      // Dessert filter
      {
        Id: 14,
        Image: "/assets/images/desserts1.png",
        ProductName: "Chocolate Delight",
        Price: 7.99,
        BackgroundColor: "#6C3483",
        Ingredientlist: "Chocolate Cake, Cream, Berries, Chocolate Chips",
        Description: "Rich chocolate dessert with fresh berries",
        category: "Dessert"
      },
      {
        Id: 15,
        Image: "/assets/images/desserts2.png",
        ProductName: "Mixed Dessert Platter",
        Price: 12.99,
        BackgroundColor: "#A569BD",
        Ingredientlist: "Brownies, Cookies, Cake, Berries, Chocolate",
        Description: "Assorted desserts perfect for sharing",
        category: "Dessert"
      },
      {
        Id: 16,
        Image: "/assets/images/desserts3.png",
        ProductName: "Mochi Dessert",
        Price: 6.99,
        BackgroundColor: "#5DADE2",
        Ingredientlist: "Mochi, Red Bean Paste, Powdered Sugar",
        Description: "Traditional Japanese mochi dessert",
        category: "Dessert"
      },
    ]


  getProduct() {
    return (this.product);
  }

  // cart functionality
  Cart: {
    CartId: number,
    ProductId: number,
    Image: string,
    ProductName: string,
    Price: number,
    BackgroundColor: string,
    Ingredientlist: string,
    Description: string,
    Quantity: number
  }[] = []

  GetCardList() {
    return (this.Cart);
  }

  AddToCart(
    ProductId: number,
    Image: string,
    ProductName: string,
    Price: number,
    BackgroundColor: string,
    Ingredientlist: string,
    Description: string,
    Quantity: number) {
    const existingItem = this.Cart.find(item => item.ProductId === ProductId);

    if (existingItem) {
      existingItem.Quantity += Quantity;
    } else {
      this.Cart.push({
        CartId: this.Cart.length + 1,
        ProductId: ProductId,
        Image: Image,
        ProductName: ProductName,
        Price: Price,
        BackgroundColor: BackgroundColor,
        Ingredientlist: Ingredientlist,
        Description: Description,
        Quantity: Quantity
      });
    }
  }

  UpdateCartQuantity(CartId: number, Quantity: number) {
    const item = this.Cart.find(x => x.CartId === CartId);
    if (item) {
      if (Quantity <= 0) {
        this.RemoveFromCart(CartId);
      } else {
        item.Quantity = Quantity;
      }
    }
  }

  RemoveFromCart(CartId: number) {
    this.Cart = this.Cart.filter(x => x.CartId !== CartId);
  }

  ClearCart() {
    this.Cart = [];
  }

  GetCartTotal() {
    return this.Cart.reduce((total, item) => total + (item.Price * item.Quantity), 0);
  }

  GetCartItemCount() {
    return this.Cart.reduce((count, item) => count + item.Quantity, 0);
  }

  // ==========================================
  // favorites functionality
  // ==========================================
  Favorites: {
    Id: number,
    Image: string,
    ProductName: string,
    Price: number,
    BackgroundColor: string,
    Ingredientlist: string,
    Description: string,
    category: string
  }[] = []

  // add to favorites
  addFavorite(product: any) {
    const exists = this.Favorites.find(item => item.Id === product.Id);
    if (!exists) {
      this.Favorites.push({
        Id: product.Id,
        Image: product.Image,
        ProductName: product.ProductName,
        Price: product.Price,
        BackgroundColor: product.BackgroundColor,
        Ingredientlist: product.Ingredientlist,
        Description: product.Description,
        category: product.category
      });
    }
  }

  // remove from favorites
  removeFavorite(productId: number) {
    this.Favorites = this.Favorites.filter(item => item.Id !== productId);
  }

  // check if favorite
  isFavorite(productId: number): boolean {
    return this.Favorites.some(item => item.Id === productId);
  }

  // get favorites list
  getFavorites() {
    return this.Favorites;
  }

  // get favorites count
  getFavoritesCount() {
    return this.Favorites.length;
  }

  // clear favorites
  clearFavorites() {
    this.Favorites = [];
  }
}