import React from 'react';
import { FARM_RECIPES } from '../../data/recipes';
import { useApp } from '../../context/AppContext';
import { ChefHat, Clock, Users, PlusCircle, Check } from 'lucide-react';

export const RecipesSection = () => {
  const { products, addToCart, addToast } = useApp();

  const handleAddAllIngredients = (recipe) => {
    let count = 0;
    recipe.ingredients.forEach((ing) => {
      const prod = products.find(p => p.id === ing.prodId);
      if (prod) {
        addToCart(prod, 1);
        count++;
      }
    });
    if (count > 0) {
      addToast(
        "Recipe Ingredients Added to Basket! 🥗",
        `Added all available ingredients for "${recipe.title}"`,
        "success"
      );
    }
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
              <ChefHat className="w-4 h-4 text-emerald-600" />
              <span>Farm Kitchen Inspirations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Cook with Fresh Seasonal Harvests
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Simple, Michelin-quality recipes designed by farm chefs to celebrate the natural terroir of local produce.
            </p>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FARM_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-stone-50 rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                    <h3 className="text-lg font-bold font-display">{recipe.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-stone-200">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {recipe.servings}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Ingredients List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Farm Ingredients:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recipe.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200 text-xs text-slate-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          <span className="font-semibold truncate">{ing.name}</span>
                          <span className="text-[11px] text-slate-400 ml-auto shrink-0">{ing.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Steps Preview */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 space-y-1.5">
                    <p className="font-bold text-emerald-900">Farm Chef Quick Tip:</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{recipe.instructions[0]}</p>
                  </div>
                </div>
              </div>

              {/* Add All Ingredients Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleAddAllIngredients(recipe)}
                  className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add All Recipe Ingredients to Basket</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
