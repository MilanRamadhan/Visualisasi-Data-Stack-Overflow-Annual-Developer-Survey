document.addEventListener('DOMContentLoaded', function() {
  // Get visualization type from URL
  const pathParts = window.location.pathname.split('/');
  const visualizationType = pathParts[pathParts.length - 1];

  // Set visualization title and description
  const titleElement = document.getElementById('visualization-title');
  const breadcrumbTitleElement = document.getElementById('vis-title');
  const descriptionElement = document.getElementById('vis-description');

  // Load visualization based on type
  switch(visualizationType) {
    case 'wage-gap':
      titleElement.textContent = 'Kesenjangan Upah berdasarkan Gender dan Pengalaman';
      breadcrumbTitleElement.textContent = 'Kesenjangan Upah';
      loadWageGapVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan kesenjangan upah (CompTotal) berdasarkan gender dan pengalaman kerja (YearsCodePro)
        di berbagai negara dengan tingkat adopsi AI tertinggi. Grafik menampilkan distribusi kompensasi berdasarkan
        tahun pengalaman kerja profesional, dikelompokkan berdasarkan gender.</p>
      `;
      break;

    case 'language-adoption':
      titleElement.textContent = 'Pola Adopsi Bahasa Pemrograman';
      breadcrumbTitleElement.textContent = 'Adopsi Bahasa Pemrograman';
      loadLanguageAdoptionVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan bagaimana pola adopsi bahasa pemrograman baru (LanguageWantToWorkWith vs LanguageHaveWorkedWith)
        berubah seiring bertambahnya usia dan pengalaman profesional. Grafik menampilkan bahasa pemrograman yang paling banyak
        ingin dipelajari oleh pengembang berdasarkan kelompok umur dan pengalaman.</p>
      `;
      break;

    case 'remote-os-platform':
      titleElement.textContent = 'Korelasi Model Kerja dengan OS dan Platform';
      breadcrumbTitleElement.textContent = 'Model Kerja & Teknologi';
      loadRemoteOSPlatformVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan korelasi antara model kerja (RemoteWork) dengan pilihan sistem operasi (OpSysProfessionalUse)
        dan preferensi platform (PlatformHaveWorkedWith). Grafik menampilkan distribusi penggunaan sistem operasi dan platform
        cloud berdasarkan jenis model kerja (remote, hybrid, onsite).</p>
      `;
      break;

    case 'database-comparison':
      titleElement.textContent = 'Perbandingan Keahlian Database';
      breadcrumbTitleElement.textContent = 'Keahlian Database';
      loadDatabaseComparisonVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan perbandingan antara keahlian database yang dimiliki (DatabaseHaveWorkedWith) dan
        yang diinginkan (DatabaseWantToWorkWith) bervariasi berdasarkan ukuran organisasi (OrgSize) dan industri.
        Grafik menampilkan tren database yang paling diminati untuk dipelajari di berbagai industri dan ukuran perusahaan.</p>
      `;
      break;

    case 'education-experience-compensation':
      titleElement.textContent = 'Hubungan Pendidikan, Pengalaman dan Kompensasi';
      breadcrumbTitleElement.textContent = 'Pendidikan & Kompensasi';
      loadEducationExperienceCompensationVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan hubungan antara tingkat pendidikan (EdLevel), pengalaman coding (YearsCode),
        dan kompensasi (CompTotal) di berbagai negara dengan adopsi AI yang berbeda. Grafik menampilkan bagaimana
        tingkat pendidikan dan pengalaman mempengaruhi kompensasi, serta bagaimana adopsi AI berperan dalam hal ini.</p>
      `;
      break;

    case 'framework-ai':
      titleElement.textContent = 'Pergeseran Preferensi Framework Web';
      breadcrumbTitleElement.textContent = 'Framework Web & AI';
      loadWebFrameworkAIVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan korelasi antara preferensi framework web dan adopsi alat AI.
        Grafik menampilkan bagaimana penggunaan alat AI mempengaruhi pilihan framework web yang ingin dipelajari.</p>
      `;
      break;

    case 'coding-vs-pro-experience':
      titleElement.textContent = 'Gap Pengalaman Coding vs. Profesional';
      breadcrumbTitleElement.textContent = 'Pengalaman Coding & Profesional';
      loadCodingVsProfessionalExperienceVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan perbedaan antara pengalaman coding total dan pengalaman profesional,
        serta pengaruhnya terhadap kompensasi di berbagai industri.</p>
      `;
      break;

    case 'buynew-orgsize-ai':
      titleElement.textContent = 'Korelasi Pembelian Alat Baru & Adopsi AI';
      breadcrumbTitleElement.textContent = 'Pembelian Alat & AI';
      loadBuyNewToolVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan korelasi antara metode pembelian alat baru, ukuran organisasi,
        dan penggunaan alat AI dalam pengembangan.</p>
      `;
      break;

    case 'personal-vs-professional-os':
      titleElement.textContent = 'OS Pribadi vs. Profesional';
      breadcrumbTitleElement.textContent = 'Perbandingan OS';
      loadPersonalVsProfessionalOSVisualization();
      descriptionElement.innerHTML = `
        <p>Visualisasi ini menunjukkan perbedaan penggunaan sistem operasi untuk keperluan pribadi dan profesional,
        berdasarkan model kerja dan kelompok usia.</p>
      `;
      break;

    default:
      titleElement.textContent = 'Visualisasi Tidak Ditemukan';
      descriptionElement.innerHTML = `
        <p>Jenis visualisasi yang diminta tidak tersedia. <a href="/">Kembali ke halaman utama</a>.</p>
      `;
  }
});

// Function to load wage gap visualization
function loadWageGapVisualization() {
  fetch('/api/wage-gap')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Kesenjangan Upah berdasarkan Gender dan Pengalaman",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "point",
        "encoding": {
          "x": {
            "field": "yearsCodePro",
            "type": "quantitative",
            "title": "Pengalaman Kerja Profesional (Tahun)"
          },
          "y": {
            "field": "compTotal",
            "type": "quantitative",
            "title": "Kompensasi Total (USD)"
          },
          "color": {
            "field": "gender",
            "type": "nominal",
            "title": "Gender"
          },
          "tooltip": [
            {"field": "country", "type": "nominal", "title": "Negara"},
            {"field": "compTotal", "type": "quantitative", "title": "Kompensasi"},
            {"field": "yearsCodePro", "type": "quantitative", "title": "Tahun Pengalaman"},
            {"field": "gender", "type": "nominal", "title": "Gender"}
          ]
        },
        "layer": [
          {"mark": "point"},
          {
            "mark": {
              "type": "line",
              "opacity": 0.5
            },
            "transform": [
              {
                "regression": "compTotal",
                "on": "yearsCodePro",
                "groupby": ["gender"]
              }
            ],
            "encoding": {
              "color": {"field": "gender", "type": "nominal"}
            }
          }
        ]
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading wage gap data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load language adoption visualization
function loadLanguageAdoptionVisualization() {
  fetch('/api/language-adoption')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Pola Adopsi Bahasa Pemrograman",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "bar",
        "encoding": {
          "y": {
            "field": "language",
            "type": "nominal",
            "title": "Bahasa Pemrograman",
            "sort": "-x"
          },
          "x": {
            "field": "count",
            "type": "quantitative",
            "title": "Jumlah Responden"
          },
          "color": {
            "field": "type",
            "type": "nominal",
            "title": "Tipe"
          },
          "tooltip": [
            {"field": "language", "type": "nominal", "title": "Bahasa"},
            {"field": "count", "type": "quantitative", "title": "Jumlah"},
            {"field": "type", "type": "nominal", "title": "Tipe"}
          ]
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading language adoption data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load remote work OS correlation visualization
function loadRemoteOSPlatformVisualization() {
  fetch('/api/remote-os-platform')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Korelasi Model Kerja dengan OS dan Platform",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "os",
            "type": "nominal",
            "title": "Sistem Operasi"
          },
          "y": {
            "field": "count",
            "type": "quantitative",
            "title": "Jumlah Pengguna"
          },
          "color": {
            "field": "remoteWork",
            "type": "nominal",
            "title": "Model Kerja"
          },
          "tooltip": [
            {"field": "os", "type": "nominal", "title": "Sistem Operasi"},
            {"field": "remoteWork", "type": "nominal", "title": "Model Kerja"},
            {"field": "count", "type": "quantitative", "title": "Jumlah"}
          ]
        },
        "facet": {
          "column": {
            "field": "remoteWork",
            "type": "nominal",
            "title": "Model Kerja"
          }
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading remote work data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load database comparison visualization
function loadDatabaseComparisonVisualization() {
  fetch('/api/database-comparison')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Perbandingan Keahlian Database",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "bar",
        "encoding": {
          "y": {
            "field": "database",
            "type": "nominal",
            "title": "Database"
          },
          "x": {
            "field": "count",
            "type": "quantitative",
            "title": "Jumlah Responden"
          },
          "color": {
            "field": "orgSize",
            "type": "nominal",
            "title": "Ukuran Organisasi"
          },
          "tooltip": [
            {"field": "database", "type": "nominal", "title": "Database"},
            {"field": "orgSize", "type": "nominal", "title": "Ukuran Organisasi"},
            {"field": "count", "type": "quantitative", "title": "Jumlah"}
          ]
        },
        "facet": {
          "column": {
            "field": "orgSize",
            "type": "nominal",
            "title": "Ukuran Organisasi"
          }
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading database comparison data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load education experience compensation visualization
function loadEducationExperienceCompensationVisualization() {
  fetch('/api/education-experience-compensation')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Hubungan Pendidikan, Pengalaman Coding, dan Kompensasi",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "circle",
        "encoding": {
          "x": {
            "field": "yearsCode",
            "type": "quantitative",
            "title": "Pengalaman Coding (Tahun)"
          },
          "y": {
            "field": "compTotal",
            "type": "quantitative",
            "title": "Kompensasi Total (USD)"
          },
          "size": {
            "field": "aiAdoption",
            "type": "quantitative",
            "title": "Tingkat Adopsi AI"
          },
          "color": {
            "field": "edLevel",
            "type": "nominal",
            "title": "Tingkat Pendidikan"
          },
          "tooltip": [
            {"field": "country", "type": "nominal", "title": "Negara"},
            {"field": "edLevel", "type": "nominal", "title": "Pendidikan"},
            {"field": "yearsCode", "type": "quantitative", "title": "Tahun Coding"},
            {"field": "compTotal", "type": "quantitative", "title": "Kompensasi"},
            {"field": "aiAdoption", "type": "quantitative", "title": "Adopsi AI"}
          ]
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading education/compensation data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load web framework AI visualization
function loadWebFrameworkAIVisualization() {
  fetch('/api/webframework-ai')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Korelasi antara Preferensi Framework Web dan Adopsi AI",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "rect",
        "encoding": {
          "x": {
            "field": "framework",
            "type": "nominal",
            "title": "Framework Web"
          },
          "y": {
            "field": "aiTool",
            "type": "nominal",
            "title": "Tool AI"
          },
          "color": {
            "field": "correlation",
            "type": "quantitative",
            "title": "Korelasi",
            "scale": {
              "scheme": "viridis"
            }
          },
          "tooltip": [
            {"field": "framework", "type": "nominal", "title": "Framework"},
            {"field": "aiTool", "type": "nominal", "title": "Tool AI"},
            {"field": "correlation", "type": "quantitative", "title": "Korelasi"}
          ]
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading framework-AI data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load coding vs professional experience visualization
function loadCodingVsProfessionalExperienceVisualization() {
  fetch('/api/coding-vs-pro-experience')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Gap Pengalaman Coding vs. Profesional",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "gap",
            "type": "nominal",
            "title": "Gap Pengalaman (Tahun Coding - Tahun Profesional)"
          },
          "y": {
            "field": "averageCompensation",
            "type": "quantitative",
            "title": "Rata-rata Kompensasi (USD)"
          },
          "tooltip": [
            {"field": "gap", "type": "nominal", "title": "Gap Pengalaman"},
            {"field": "averageCompensation", "type": "quantitative", "title": "Rata-rata Kompensasi"}
          ]
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading experience comparison data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load buy new tool visualization
function loadBuyNewToolVisualization() {
  fetch('/api/buynew-orgsize-ai')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Korelasi antara Metode Pembelian Alat, Ukuran Organisasi, dan Penggunaan AI",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "circle",
        "encoding": {
          "y": {
            "field": "buyMethod",
            "type": "nominal",
            "title": "Metode Pembelian Alat Baru"
          },
          "x": {
            "field": "orgSize",
            "type": "nominal",
            "title": "Ukuran Organisasi"
          },
          "size": {
            "field": "count",
            "type": "quantitative",
            "title": "Jumlah Responden",
            "scale": {
              "range": [50, 500]
            }
          },
          "color": {
            "field": "aiToolsCount",
            "type": "quantitative",
            "title": "Jumlah Tool AI yang Digunakan",
            "scale": {
              "scheme": "viridis"
            }
          },
          "tooltip": [
            {"field": "orgSize", "type": "nominal", "title": "Ukuran Organisasi"},
            {"field": "buyMethod", "type": "nominal", "title": "Metode Pembelian"},
            {"field": "count", "type": "quantitative", "title": "Jumlah Responden"},
            {"field": "aiToolsCount", "type": "quantitative", "title": "Jumlah Tool AI"}
          ]
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading buy tool data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}

// Function to load personal vs professional OS visualization
function loadPersonalVsProfessionalOSVisualization() {
  fetch('/api/personal-vs-professional-os')
    .then(response => response.json())
    .then(data => {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Perbandingan Penggunaan Sistem Operasi: Personal vs Professional",
        "data": {"values": data},
        "width": 800,
        "height": 500,
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "os",
            "type": "nominal",
            "title": "Sistem Operasi"
          },
          "y": {
            "field": "count",
            "type": "quantitative",
            "title": "Jumlah Pengguna"
          },
          "color": {
            "field": "usage",
            "type": "nominal",
            "title": "Jenis Penggunaan"
          },
          "tooltip": [
            {"field": "os", "type": "nominal", "title": "Sistem Operasi"},
            {"field": "usage", "type": "nominal", "title": "Jenis Penggunaan"},
            {"field": "count", "type": "quantitative", "title": "Jumlah Pengguna"}
          ]
        }
      };

      vegaEmbed('#vis-container', spec, {actions: false});
    })
    .catch(error => {
      console.error('Error loading OS comparison data:', error);
      document.getElementById('vis-container').innerHTML = `
        <div class="alert alert-danger">Error memuat data: ${error.message}</div>
      `;
    });
}