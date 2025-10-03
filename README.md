<h1>React Native Todo app</h1>

Clean minimalist todo app build with Expo, React Native and Typescript.

<h2>Features</h2>
<ul>
  <li>✅ Create, edit, complete, and remove todos</li>
  <li>🔎 Filter by <strong>All / Active / Completed</strong> (persistent view state)</li>
  <li>🗓 Optional due date (date-only display in NL/EN)</li>
  <li>⚡️ High-performance lists with <code>@shopify/flash-list</code></li>
  <li>🌍 Language toggle (NL/EN) powered by i18next</li>
  <li>🤏 Interactions:
    <ul>
      <li><strong>Tap</strong> a row → toggle completed</li>
      <li><strong>Long press</strong> a row → navigate to Edit</li>
    </ul>
  </li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Expo</strong> (managed workflow)</li>
  <li><strong>React Native</strong> + <strong>TypeScript</strong></li>
  <li><strong>Expo Router</strong></li>
  <li><strong>Zustand</strong> (domain + view stores)</li>
  <li><strong>i18next</strong> + <strong>react-i18next</strong></li>
  <li><strong>@shopify/flash-list</strong> (high-performance list)</li>
</ul>

<h2>1) Requirements</h2>
<ul>
  <li>Node 18+</li>
  <li>iOS/Android simulator</li>
</ul>

<h2>2) Installation</h2>
<pre><code>
git clone -repo url-
</code></pre>
<pre><code>cd rn-todos</code></pre>
<pre><code>npm install</code></pre>

<h2>3) Start EXPO server</h2>
<pre><code>npm run start</code>
or
<code>npx run start</code></pre>

<h3>Run on simulator</h3>
<pre>
  <code>npx expo run:android</code>
  or
  <code>npx expo run:ios</code>
</pre>

<h2>Internationalization (i18n)</h2>
<ul>
  <li>i18next is initialized in <code>src/lib/i18n/index.ts</code>.</li>
  <li><code>LocaleGate</code> watches the <code>useLocale</code> store and calls <code>i18n.changeLanguage(locale)</code> so screens re-render correctly.</li>
  <li>Use translations via:</li>
</ul>
<pre><code>import { useTranslation } from "react-i18next";
const { t } = useTranslation("common");
&lt;Text&gt;{t("todos.title")}&lt;/Text&gt;
</code></pre>
<ul>
  <li>Toggle language in UI with <code>LanguageToggle</code> (NL/EN buttons).</li>
</ul>

<h2>Theming &amp; UI</h2>
<ul>
  <li>Centralized tokens in <code>ui/theme/palette.ts</code>:
    <ul>
      <li><code>colors.brand</code>, <code>colors.bg</code>, <code>colors.card</code>, <code>colors.text</code>, <code>colors.subtle</code>, etc.</li>
      <li><code>radius</code>, <code>spacing</code>, <code>type</code></li>
    </ul>
  </li>
  <li><strong>Button</strong> variants: <code>primary</code>, <code>outline</code>, <code>ghost</code>. All variants share a common base (same height, padding, borderWidth) to avoid layout jumps when toggling variant (e.g., language buttons).</li>
</ul>

<p><strong>Example (inside <code>Button.tsx</code>)</strong>:</p>
<pre><code>const HEIGHT = 40;
const base = {
  height: HEIGHT,
  paddingHorizontal: t.spacing.md,
  borderRadius: t.radius.sm,
  borderWidth: 1,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  flexDirection: "row" as const
};

const styles = {
primary: { ...base, backgroundColor: t.colors.brand, borderColor: t.colors.brand },
outline: { ...base, backgroundColor: "transparent", borderColor: t.colors.border },
ghost: { ...base, backgroundColor: "transparent", borderColor: "transparent" }
} as const;
</code></pre>
