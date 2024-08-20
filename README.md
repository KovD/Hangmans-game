# Akasztófa Játék

Ez az egyszerű akasztófa játék egy bejelentkezési panellel rendelkezik, ahol a játékos megadja a nevét. A játék során a klasszikus akasztófa szabályai érvényesülnek: a játékosnak betűket kell kitalálnia egy adott szóhoz, és ha nem sikerül időben kitalálnia a szót, kap egy tippet. A játék végeztével a pontok alapján a játékos helyezése megjelenik a leaderboardon.

## Fő Funkciók

1. **Bejelentkezési Panel:**
   - A játékos a játék kezdetén megadja a nevét.
   - A rendszer generál egy egyedi azonosítót (UUID) a játékos számára.

2. **Akasztófa Játékmenet:**
   - A játékosnak egy rejtett szót kell kitalálnia betűről betűre.
   - A klasszikus akasztófa szabályai érvényesülnek: minden hibás találat csökkenti az esélyeket.
   - Ha a játékos sokáig nem találja ki a szót, egy tipp (hint) segít a folytatásban.
   - Ha a játékos veszít, az összes pontja nullázódik.

3. **Nehézségi Szintek:**
   - Ahogy a játékos egyre több szót talál el, a következő szavak egyre nehezebbek lesznek.

4. **Leaderboard:**
   - A játékosok pontszámait egy leaderboard tárolja.
   - A leaderboard egy JavaScript alapú WebSocket megoldást használ a valós idejű frissítéshez.
   - A pontszámokat egy SQLite3 adatbázisban tároljuk.

## Technológiai Megoldások

- **Backend:** Javascript a websocket server kezelésére.
- **Frontend:** HTML/CSS/JavaScript a felhasználói felülethez.
- **WebSocket:** Valós idejű kommunikáció a leaderboard frissítéséhez.
- **SQLite3:** Adatbázis a játékosok pontszámának tárolására.
- **UUID:** A játékosok egyedi azonosítására a bejelentkezéskor.

## Telepítés és Futtatás
Nem kell telepíteni semmit. A játék fut a https://kovd.github.io/Hangmans-game/ linken.

## Játékmenet

1. **Bejelentkezés:** Add meg a neved, majd kattints a „Start” gombra. Ekkor a játék generál egy UUID-t, és a játék elindul.
2. **Betűk Tippelése:** A felületen válassz betűket, amíg meg nem találod a rejtett szót.
3. **Hint (Tipp):** Ha sokáig nem találod ki a szót, a rendszer automatikusan ad egy tippet.
4. **Pontok és Leaderboard:** A helyesen kitalált szavakért pontokat kapsz. Ha vesztesz, a pontjaid nullázódnak. Az eredményedet a leaderboardon láthatod, amely valós időben frissül.

## Továbbfejlesztési Lehetőségek

- További nehézségi szintek.
- Szókincs bővítése több témakörben.
- Szavak kategorizálása témák szerint.

