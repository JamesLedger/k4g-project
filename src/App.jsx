import { useState } from 'react'
import './App.css'

const recipes = [
  {
    id: 1,
    title: 'Thai Coconut Curry',
    emoji: '🍛',
    category: 'Mains',
    time: '35 min',
    servings: 4,
    difficulty: 'Easy',
    description: 'A rich and fragrant coconut curry loaded with seasonal vegetables and crispy tofu.',
    story: {
      title: 'Why Tofu Instead of Chicken?',
      text: 'Billions of chickens are raised in factory farms each year, confined to spaces smaller than a sheet of paper. They never feel sunlight or scratch at the earth — natural behaviors essential to their wellbeing. By choosing tofu, we get the same satisfying protein with a rich, curry-soaked texture, while sparing these intelligent, social birds from a life of suffering. Every plant-based curry is a small act of compassion.',
    },
    ingredients: [
      '400ml coconut milk',
      '2 tbsp red curry paste',
      '1 block extra-firm tofu, cubed',
      '1 red bell pepper, sliced',
      '150g broccoli florets',
      '1 cup snap peas',
      '2 tbsp soy sauce',
      '1 tbsp maple syrup',
      '1 tbsp lime juice',
      'Fresh basil & cilantro',
      'Jasmine rice, to serve',
    ],
    steps: [
      'Press tofu for 15 minutes, then cube and pan-fry until golden on all sides. Set aside.',
      'In the same pan, heat a splash of oil and cook the curry paste for 1 minute until fragrant.',
      'Pour in the coconut milk, soy sauce, and maple syrup. Stir and bring to a gentle simmer.',
      'Add the bell pepper, broccoli, and snap peas. Cook for 5-7 minutes until tender-crisp.',
      'Return the tofu to the pan, squeeze in the lime juice, and toss gently.',
      'Serve over jasmine rice, topped with fresh basil and cilantro.',
    ],
  },
  {
    id: 2,
    title: 'Avocado & Black Bean Tacos',
    emoji: '🌮',
    category: 'Mains',
    time: '20 min',
    servings: 3,
    difficulty: 'Easy',
    description: 'Smoky spiced black beans with creamy avocado, pickled onion, and a zesty lime crema.',
    story: {
      title: 'Beans Over Beef',
      text: 'Cattle ranching is the leading driver of deforestation in the Amazon and a major source of greenhouse gases. Beyond the environmental toll, cows form deep bonds with their calves — bonds that are routinely broken in the meat industry. Black beans deliver iron, fiber, and protein without any of that cost. These tacos prove that bold, satisfying flavor doesn\'t require animal suffering.',
    },
    ingredients: [
      '1 can black beans, drained',
      '1 tsp smoked paprika',
      '1 tsp cumin',
      '2 ripe avocados',
      '6 small corn tortillas',
      '1/2 red onion, thinly sliced',
      '2 tbsp apple cider vinegar',
      '1/4 cup cashew cream',
      '1 lime',
      'Fresh cilantro',
      'Hot sauce to taste',
    ],
    steps: [
      'Quick-pickle the red onion slices in apple cider vinegar with a pinch of sugar for 15 minutes.',
      'Heat the black beans in a pan with paprika, cumin, and a splash of water. Mash lightly.',
      'Halve and slice the avocados. Mix cashew cream with lime zest.',
      'Warm the tortillas in a dry skillet until pliable.',
      'Assemble: beans, avocado slices, pickled onion, a drizzle of lime crema, and cilantro.',
      'Finish with a squeeze of lime and hot sauce.',
    ],
  },
  {
    id: 3,
    title: 'Creamy Mushroom Risotto',
    emoji: '🍄',
    category: 'Mains',
    time: '45 min',
    servings: 4,
    difficulty: 'Medium',
    description: 'Luxuriously creamy arborio rice with a medley of wild mushrooms and fresh thyme.',
    story: {
      title: 'The Umami of Mushrooms',
      text: 'Traditional risotto relies on parmesan and butter — both products of the dairy industry, where cows are kept in continuous cycles of pregnancy and separation from their newborns. Nutritional yeast and mushrooms deliver the same deep, savory umami without any animal involvement. Mushrooms are nature\'s proof that plants can be every bit as rich and complex as any animal product.',
    },
    ingredients: [
      '300g arborio rice',
      '400g mixed mushrooms, sliced',
      '1L vegetable stock, warm',
      '1 onion, finely diced',
      '3 cloves garlic, minced',
      '120ml dry white wine',
      '2 tbsp nutritional yeast',
      '2 tbsp vegan butter',
      'Fresh thyme & parsley',
      'Salt & pepper to taste',
    ],
    steps: [
      'Sauté the mushrooms in olive oil over high heat until deeply golden. Season and set aside.',
      'In the same pot, cook the onion and garlic in vegan butter until soft and translucent.',
      'Add the arborio rice and toast for 2 minutes, stirring constantly.',
      'Pour in the white wine and stir until absorbed.',
      'Add warm stock one ladle at a time, stirring frequently, until the rice is creamy and al dente (about 18 minutes).',
      'Fold in the mushrooms, nutritional yeast, and fresh thyme. Adjust seasoning and serve immediately.',
    ],
  },
  {
    id: 4,
    title: 'Rainbow Buddha Bowl',
    emoji: '🥗',
    category: 'Bowls',
    time: '25 min',
    servings: 2,
    difficulty: 'Easy',
    description: 'A vibrant nourish bowl with roasted sweet potato, quinoa, and tahini dressing.',
    story: {
      title: 'Nourishment Without Harm',
      text: 'A single plant-based bowl like this uses a fraction of the land, water, and energy required to produce the same nutrition from animal sources. The fishing industry alone kills over a trillion marine animals each year, devastating ocean ecosystems. By filling our bowls with colorful plants, grains, and seeds, we nourish ourselves fully while leaving the natural world intact.',
    },
    ingredients: [
      '1 large sweet potato, cubed',
      '1 cup cooked quinoa',
      '1 cup shredded red cabbage',
      '1 carrot, julienned',
      '1 avocado, sliced',
      '1/2 cup edamame',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      '1 tbsp maple syrup',
      'Sesame seeds',
      'Microgreens',
    ],
    steps: [
      'Roast sweet potato cubes at 200°C (400°F) with olive oil, salt, and pepper for 20 minutes.',
      'Whisk together tahini, lemon juice, maple syrup, and a splash of water for the dressing.',
      'Arrange quinoa as the base in two bowls.',
      'Top with roasted sweet potato, cabbage, carrot, avocado, and edamame in sections.',
      'Drizzle generously with tahini dressing.',
      'Garnish with sesame seeds and microgreens.',
    ],
  },
  {
    id: 5,
    title: 'Chocolate Avocado Mousse',
    emoji: '🍫',
    category: 'Desserts',
    time: '10 min',
    servings: 4,
    difficulty: 'Easy',
    description: 'Silky smooth chocolate mousse made with ripe avocados — no one will guess the secret ingredient.',
    story: {
      title: 'Dessert Without Dairy',
      text: 'The dairy industry depends on repeatedly impregnating cows and taking their calves away within hours of birth — a process that causes documented distress to both mother and calf. Heavy cream and eggs aren\'t necessary for decadent desserts. This mousse uses avocado for its impossibly silky texture, proving that compassion and indulgence can exist on the same plate.',
    },
    ingredients: [
      '2 ripe avocados',
      '1/3 cup cocoa powder',
      '1/4 cup maple syrup',
      '1/4 cup almond milk',
      '1 tsp vanilla extract',
      'Pinch of sea salt',
      'Fresh berries for topping',
      'Coconut whipped cream',
    ],
    steps: [
      'Scoop the avocado flesh into a food processor or blender.',
      'Add cocoa powder, maple syrup, almond milk, vanilla, and salt.',
      'Blend until perfectly smooth, scraping down the sides as needed.',
      'Taste and adjust sweetness — add more maple syrup if desired.',
      'Divide into serving glasses and refrigerate for at least 30 minutes.',
      'Top with coconut whipped cream and fresh berries before serving.',
    ],
  },
  {
    id: 6,
    title: 'Roasted Cauliflower Soup',
    emoji: '🥣',
    category: 'Soups',
    time: '40 min',
    servings: 4,
    difficulty: 'Easy',
    description: 'Velvety smooth roasted cauliflower soup with a hint of nutmeg and crispy croutons.',
    story: {
      title: 'Creamy Without the Cruelty',
      text: 'Most creamy soups are built on a base of butter, cream, and chicken stock — all products tied to animal suffering. Soaked cashews blend into a silky, rich cream that rivals any dairy, and roasted vegetables make their own deeply flavorful stock. Animals raised for stock production often endure overcrowded, stressful conditions. This soup shows how simple plant ingredients can deliver warmth and comfort without contributing to that cycle.',
    },
    ingredients: [
      '1 large head cauliflower, cut into florets',
      '1 onion, quartered',
      '4 cloves garlic',
      '3 cups vegetable stock',
      '1/2 cup raw cashews, soaked',
      '2 tbsp olive oil',
      '1/4 tsp nutmeg',
      'Crusty bread for croutons',
      'Chives for garnish',
      'Salt & pepper to taste',
    ],
    steps: [
      'Toss cauliflower florets, onion, and garlic with olive oil. Roast at 220°C (425°F) for 25 minutes until caramelized.',
      'Transfer roasted vegetables to a pot, add vegetable stock and drained cashews.',
      'Simmer for 5 minutes, then blend until silky smooth.',
      'Season with nutmeg, salt, and pepper.',
      'Make croutons by cubing bread and toasting in olive oil until golden.',
      'Serve soup in bowls with croutons and a sprinkle of chives.',
    ],
  },
  {
    id: 7,
    title: 'Mango Coconut Chia Pudding',
    emoji: '🥭',
    category: 'Breakfast',
    time: '5 min + overnight',
    servings: 2,
    difficulty: 'Easy',
    description: 'Tropical overnight chia pudding layered with fresh mango and toasted coconut.',
    story: {
      title: 'A Kinder Morning Routine',
      text: 'Traditional puddings and yogurts rely on cow\'s milk from an industry where animals rarely see a pasture. Dairy cows are among the most overworked farm animals, often suffering painful health conditions from years of intensive milking. Coconut milk is naturally creamy, rich in healthy fats, and requires no animal involvement at all. Starting your day with plants is the gentlest way to begin.',
    },
    ingredients: [
      '1/3 cup chia seeds',
      '1 cup coconut milk',
      '1 tbsp maple syrup',
      '1/2 tsp vanilla extract',
      '1 ripe mango, diced',
      '2 tbsp toasted coconut flakes',
      'Fresh mint leaves',
      'Passion fruit (optional)',
    ],
    steps: [
      'Mix chia seeds, coconut milk, maple syrup, and vanilla in a jar.',
      'Stir well, then let sit for 5 minutes and stir again to prevent clumping.',
      'Cover and refrigerate overnight (or at least 4 hours).',
      'Layer the chia pudding with diced mango in glasses.',
      'Top with toasted coconut flakes and mint.',
      'Add passion fruit pulp on top for extra tropical flavor.',
    ],
  },
  {
    id: 8,
    title: 'Spicy Peanut Noodles',
    emoji: '🍜',
    category: 'Mains',
    time: '15 min',
    servings: 2,
    difficulty: 'Easy',
    description: 'Saucy peanut noodles with crunchy vegetables and a kick of sriracha.',
    story: {
      title: 'Plants Pack the Protein',
      text: 'Peanuts contain more protein per gram than many animal products, and no animal has to suffer to produce them. The global appetite for cheap meat drives factory farming conditions where pigs — animals as intelligent and social as dogs — spend their entire lives in concrete pens without space to turn around. Choosing plant proteins like peanuts and edamame is a powerful, everyday way to stand against that system.',
    },
    ingredients: [
      '200g rice noodles',
      '3 tbsp peanut butter',
      '2 tbsp soy sauce',
      '1 tbsp rice vinegar',
      '1 tbsp sriracha',
      '1 tbsp sesame oil',
      '1 carrot, julienned',
      '1 cucumber, julienned',
      '1/2 cup edamame',
      'Crushed peanuts',
      'Lime wedges & scallions',
    ],
    steps: [
      'Cook rice noodles according to package directions. Drain and rinse with cold water.',
      'Whisk together peanut butter, soy sauce, rice vinegar, sriracha, and sesame oil.',
      'Thin the sauce with 2-3 tbsp warm water until it coats a spoon.',
      'Toss the noodles with the peanut sauce until evenly coated.',
      'Top with julienned carrot, cucumber, and edamame.',
      'Finish with crushed peanuts, sliced scallions, and lime wedges.',
    ],
  },
  {
    id: 9,
    title: 'Berry Smoothie Bowl',
    emoji: '🫐',
    category: 'Breakfast',
    time: '10 min',
    servings: 1,
    difficulty: 'Easy',
    description: 'A thick and frosty berry smoothie bowl loaded with crunchy granola and fresh fruit.',
    story: {
      title: 'Saving the Bees, Too',
      text: 'Animal welfare extends beyond farms. Commercial honey production and industrial agriculture threaten bee populations worldwide — pollinators responsible for one-third of the food we eat. By choosing agave over honey and supporting organic fruit farming, we help protect these vital creatures. This bowl uses oat milk instead of dairy and agave instead of honey, keeping it kind to every species in the chain.',
    },
    ingredients: [
      '1 cup frozen mixed berries',
      '1 frozen banana',
      '1/4 cup oat milk',
      '1 tbsp almond butter',
      'Granola',
      'Fresh strawberries & blueberries',
      'Chia seeds',
      'Coconut flakes',
      'Drizzle of agave',
    ],
    steps: [
      'Blend frozen berries, frozen banana, oat milk, and almond butter until thick and creamy.',
      'Keep the consistency very thick — add only minimal liquid.',
      'Pour into a bowl.',
      'Arrange granola, fresh berries, coconut flakes, and chia seeds on top.',
      'Drizzle with agave nectar.',
      'Eat immediately with a spoon — not a straw!',
    ],
  },
]

const categories = ['All', ...new Set(recipes.map((r) => r.category))]

function RecipeCard({ recipe, onClick }) {
  return (
    <button className="recipe-card" onClick={onClick}>
      <div className="recipe-card__image">
        <span className="recipe-card__emoji">{recipe.emoji}</span>
      </div>
      <div className="recipe-card__body">
        <div className="recipe-card__meta">
          <span className="recipe-card__category">{recipe.category}</span>
          <span className="recipe-card__difficulty">{recipe.difficulty}</span>
        </div>
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <p className="recipe-card__desc">{recipe.description}</p>
        <div className="recipe-card__footer">
          <span>⏱ {recipe.time}</span>
          <span>👤 {recipe.servings} servings</span>
        </div>
      </div>
    </button>
  )
}

function RecipeDetail({ recipe, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <article className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal__hero">
          <span className="modal__emoji">{recipe.emoji}</span>
        </div>
        <div className="modal__content">
          <div className="modal__header">
            <h2>{recipe.title}</h2>
            <p className="modal__desc">{recipe.description}</p>
            <div className="modal__tags">
              <span className="tag tag--green">{recipe.category}</span>
              <span className="tag tag--warm">⏱ {recipe.time}</span>
              <span className="tag tag--warm">👤 {recipe.servings} servings</span>
              <span className="tag tag--warm">{recipe.difficulty}</span>
            </div>
          </div>
          {recipe.story && (
            <div className="modal__story">
              <div className="modal__story-icon">💚</div>
              <h3>{recipe.story.title}</h3>
              <p>{recipe.story.text}</p>
            </div>
          )}
          <div className="modal__grid">
            <div className="modal__section">
              <h3>Ingredients</h3>
              <ul className="ingredient-list">
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="modal__section">
              <h3>Instructions</h3>
              <ol className="steps-list">
                {recipe.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = recipes.filter((r) => {
    const matchesCategory =
      activeCategory === 'All' || r.category === activeCategory
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <a href="/" className="logo">
            <span className="logo__icon">🌿</span>
            <span className="logo__text">Evergreen Eats</span>
          </a>
          <nav className="nav">
            <a href="#recipes">Recipes</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero__inner">
          <span className="hero__badge">100% Plant-Based</span>
          <h1>
            Delicious Vegan Recipes
            <br />
            <span className="hero__accent">Made Simple</span>
          </h1>
          <p className="hero__subtitle">
            Discover wholesome, flavorful plant-based recipes that are easy to
            make and impossible to resist.
          </p>
          <div className="hero__search">
            <svg
              className="hero__search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="main" id="recipes">
        <div className="main__inner">
          <div className="category-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'category-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">🔍</span>
              <p>No recipes found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {filtered.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <section className="about" id="about">
        <div className="about__inner">
          <h2>About Evergreen Eats</h2>
          <p>
            We believe plant-based eating should be joyful, approachable, and
            delicious. Every recipe is crafted with whole, natural ingredients —
            no complicated techniques, no hard-to-find items. Just real food
            that happens to be vegan.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <p>&copy; 2026 Evergreen Eats. Made with 💚 and plants.</p>
        </div>
      </footer>

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  )
}

export default App
