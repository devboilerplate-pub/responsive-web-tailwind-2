# 프로젝트 이미지 프롬프트 (Project Image Prompts)

에디토리얼 푸드 매거진 컨셉에 맞춘 고화질 이미지 생성을 위한 프롬프트입니다.

## 1. 히어로 섹션 (Hero Section)

### 비빔냉면 (Hero Image)
- **Prompt:**
  ```text
  Editorial food photography of Korean spicy cold noodles (Bibim Naengmyeon) in a beautiful large ceramic bowl. The noodles are topped with sliced cucumber, half a boiled egg, and rich red spicy gochujang sauce. Placed on a dark slate table with negative space on the left side for text. Cinematic lighting, dramatic shadows, top-down view, 8k, photorealistic, premium food magazine aesthetic.
  ```

## 2. 요리명 (12가지 레시피)

### Recipe 1: 매콤달콤 비빔냉면 (Spicy Sweet Bibim Naengmyeon)
- **Prompt:**
  ```text
  Close-up editorial food photography of Korean spicy cold noodles (Bibim Naengmyeon) with glossy red sauce, sliced cucumber, and half a boiled egg in a stylish ceramic bowl. Studio lighting, highly appetizing, rich colors, shallow depth of field, professional food styling, 8k, photorealistic.
  ```

### Recipe 2: 클래식 스파게티 까르보나라 (Classic Spaghetti Carbonara)
- **Prompt:**
  ```text
  Authentic Roman Spaghetti Carbonara in a rustic white plate, coated in a creamy glossy egg and cheese sauce, topped with crispy guanciale chunks and cracked black pepper. Warm lighting, Italian countryside mood, high-end food photography, photorealistic, 45-degree angle, 8k.
  ```

### Recipe 3: 말차 크레이프 케이크 (Matcha Crepe Cake)
- **Prompt:**
  ```text
  A slice of Matcha Crepe Cake with 20 paper-thin layers of green tea crepes and cream, heavily dusted with bright green matcha powder on top, served on a minimalist dessert plate. Soft natural window light, elegant and delicate, food magazine style, macro photography, 8k resolution.
  ```

### Recipe 4: 소유 라멘 (Shoyu Ramen)
- **Prompt:**
  ```text
  A steaming bowl of Japanese Shoyu Ramen with clear rich dark broth, chewy noodles, sliced chashu pork, a soft-boiled marinated egg cut in half, and freshly chopped scallions. Moody dramatic lighting, steam rising gracefully, atmospheric, professional food photography, close-up, highly detailed.
  ```

### Recipe 5: 지중해식 퀴노아 보울 (Mediterranean Quinoa Bowl)
- **Prompt:**
  ```text
  Vibrant Mediterranean Quinoa Bowl with bright red cherry tomatoes, diced crisp cucumbers, red onions, kalamata olives, and crumbled white feta cheese, beautifully drizzled with shiny olive oil. Bright, fresh natural lighting, colorful, healthy food aesthetic, top-down view, photorealistic, 8k.
  ```

### Recipe 6: 아보카도 토스트와 수란 (Avocado Toast 우ith Poached Egg)
- **Prompt:**
  ```text
  A thick artisan slice of toasted sourdough bread generously topped with vibrant green mashed avocado and a perfectly round poached egg, sprinkled with red pepper flakes. Morning warm sunlight, aesthetic minimalist cafe setting, macro food photography, highly detailed, appetizing, shallow depth of field.
  ```

### Recipe 7: 클래식 티라미수 (Classic Tiramisu)
- **Prompt:**
  ```text
  A beautiful neat square portion of classic Italian Tiramisu, showcasing distinct layers of espresso-soaked ladyfingers and rich mascarpone cream, heavily dusted with dark cocoa powder. Dark moody background, elegant styling, decadent dessert photography, rich textures, 8k, cinematic lighting.
  ```

### Recipe 8: 스팸 김치볶음밥 (Spam Kimchi Fried Rice)
- **Prompt:**
  ```text
  Korean Spam Kimchi Fried Rice with vibrant red and orange hues, topped with a perfect sunny-side-up fried egg and roasted seaweed flakes, served sizzling in a black cast iron skillet. Directional lighting, rustic yet premium food photography, highly detailed, glossy and appetizing, 8k.
  ```

### Recipe 9: 카프레제 샐러드 (Caprese Salad)
- **Prompt:**
  ```text
  Fresh authentic Caprese Salad featuring thick alternating slices of ripe red tomatoes and fresh white mozzarella cheese, garnished with bright green basil leaves, artistically drizzled with thick dark balsamic glaze and extra virgin olive oil. Bright Mediterranean sunlight, vibrant colors, top-down view, editorial style.
  ```

### Recipe 10: 버섯 크림 리조또 (Mushroom Cream Risotto)
- **Prompt:**
  ```text
  Creamy Italian Mushroom Risotto in a wide shallow ceramic bowl, rich and velvety wet texture, elegantly topped with golden sautéed mushrooms, delicate parmesan shavings, and fresh chopped parsley. Warm cozy lighting, rustic elegant dining setting, deeply appetizing, photorealistic food photography, 45-degree angle.
  ```

### Recipe 11: 크리스피 두부 채소 볶음 (Crispy Tofu Vegetable Stir-fry)
- **Prompt:**
  ```text
  Crispy golden pan-fried tofu cubes and bright green broccoli florets tossed in a glossy dark soy ginger glaze, served beautifully on an artisan ceramic plate. High contrast lighting, appetizing glossy shine on the sauce, fresh and healthy, premium editorial food magazine style, 8k.
  ```

### Recipe 12: 소고기 규동 (Beef Gyudon)
- **Prompt:**
  ```text
  Japanese Beef Gyudon bowl, showcasing thin slices of tender simmered beef and sweet onions served over a bed of warm fluffy white rice, elegantly garnished with a pinch of bright pickled red ginger. Steaming hot, warm inviting lighting, macro close-up, authentic Japanese food styling, photorealistic, 8k.
  ```

---

## 3. 이미지 적용 정보 (Image Implementation Info)

위에서 생성할 이미지들이 프로젝트의 어느 파일, 어느 위치(코드)에 적용되어 있는지 정리한 정보입니다.

### 1) 히어로 섹션 이미지 (`hero.jpg`)
- **파일 이름:** `index.html`
- **파일 경로:** `./index.html` (또는 `f:\githubrepo\devboilerplate\responsive-web-tailwind 2\index.html`)
- **적용 위치 (코드):**
  ```html
  <div id="hero-image"
      class="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-105"
      style="background-image: url('./images/hero.jpg')">
  </div>
  ```

### 2) 레시피 이미지 1 ~ 12 (`recipe-1.jpg` ~ `recipe-12.jpg`)
- **파일 이름:** `data.js`
- **파일 경로:** `./js/data.js` (또는 `f:\githubrepo\devboilerplate\responsive-web-tailwind 2\js\data.js`)
- **적용 위치 (코드):**
  `data.js` 파일 내의 `recipes` 배열에 있는 각 레시피 객체(Object)의 `image` 속성값으로 지정되어 있습니다.
  
  ```javascript
  const recipes = [
    {
      id: 1,
      title: "매콤달콤 비빔냉면",
      // ...
      image: "./images/recipe-1.jpg", // <--- 1번 레시피 이미지
      // ...
    },
    // ...
  ```
  **각 레시피 번호별 이미지 매핑 정보:**
  - Recipe 1: `./images/recipe-1.jpg`
  - Recipe 2: `./images/recipe-2.jpg`
  - Recipe 3: `./images/recipe-3.jpg`
  - Recipe 4: `./images/recipe-4.jpg`
  - Recipe 5: `./images/recipe-5.jpg`
  - Recipe 6: `./images/recipe-6.jpg`
  - Recipe 7: `./images/recipe-7.jpg`
  - Recipe 8: `./images/recipe-8.jpg`
  - Recipe 9: `./images/recipe-9.jpg`
  - Recipe 10: `./images/recipe-10.jpg`
  - Recipe 11: `./images/recipe-11.jpg`
  - Recipe 12: `./images/recipe-12.jpg`
