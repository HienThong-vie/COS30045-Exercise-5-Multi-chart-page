# Exercise 5 – Multi-chart web page

COS30045 Data Visualisation – Demonstration 2 (Week 7)
Chung Hien Thong (106212681), Swinburne University of Technology

**Live site (Mercury):** http://mercury.swin.edu.au/cos30045/s106212681/dv-05-multichart-webpage/index.html

## What this is

Three charts on one page: a vertical bar chart with axes (5.1, energy use of 55" TVs by screen type), a scatter plot that becomes a line/area chart (5.2, Australian electricity spot prices 1998–2024) and a donut chart that can switch to a pie (5.3, share of small/medium/large TVs).

All four Demonstration 2 exercises share the same navigation bar, so they work as one website on Mercury:

| Exercise | Folder / repository |
|---|---|
| 4.1 SVG house | `dv-03-svg-exercise` |
| 4.3–4.7 Website with bar chart | `dv-04-bar-chart-exercise` |
| 5 Multi-chart page | `dv-05-multichart-webpage` |
| 6 Interactivity | `dv-06-interactivity` |

## Files

```
index.html              one page, one div per chart
css/style.css           site + chart styles
js/shared-constants.js  margins and sizes used by all charts
js/bar-chart.js         5.1 vertical bar chart
js/line-chart.js        5.2 scatter plot + line chart (+ area)
js/donut-chart.js       5.3 donut / pie chart
data/Ex5_TV_energy_55inchtv_byScreenType.csv
data/ARE_Spot_Prices.csv
data/Ex5_TV_screensize_category.csv
```

## Running locally

`d3.csv()` uses `fetch`, so the page must be served over HTTP (opening the file directly with `file://` blocks the CSV).
Use the VS Code **Live Server** extension, or run `python -m http.server 8000` in this folder and open http://localhost:8000.
D3 v7 is loaded from `https://d3js.org/d3.v7.min.js`.

## References

- Dufour, A. M. & Meeks, E. (2024). *D3.js in Action* (3rd ed.). Manning Publications.
- COS30045 Week 4–6 exercise instructions (Canvas, 2026).
- Australian Government Energy Rating – television registration data (2026); Australian Energy Regulator – annual spot prices (1998–2024).
