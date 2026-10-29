import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  VerticalAlign,
  BorderStyle,
  PageOrientation,
  Header,
  Footer,
  PageNumber,
  HeadingLevel
} from 'docx';
import { ExamProject } from '../types/exam';
import { calculateMatrixRows, calculateMatrixSummary, generateSpecificationRows } from './matrixEngine';

function cleanHex(color: string): string {
  return color.replace('#', '').toUpperCase();
}

export async function exportExamToWord(project: ExamProject): Promise<void> {
  const { generalInfo, exportSettings, sections } = project;
  const activeSections = sections.filter(s => s.enabled);
  const matrixRows = calculateMatrixRows(project);
  const matrixSummary = calculateMatrixSummary(matrixRows, project);
  const specRows = generateSpecificationRows(project);

  const primaryColor = cleanHex(exportSettings.primaryColor || '1E3A8A');
  const lightBg = 'F1F5F9';
  const subHeaderBg = 'E2E8F0';
  const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' }
  };

  // Header Box
  const schoolHeaderTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: (generalInfo.deptName || 'SỞ GD&ĐT').toUpperCase(),
                    font: exportSettings.fontFamily,
                    size: 20
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: (generalInfo.schoolName || 'TRƯỜNG THPT').toUpperCase(),
                    bold: true,
                    font: exportSettings.fontFamily,
                    size: 20
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                    bold: true,
                    font: exportSettings.fontFamily,
                    size: 20
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Độc lập - Tự do - Hạnh phúc',
                    italics: true,
                    font: exportSettings.fontFamily,
                    size: 20
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  const subjectLabel =
    generalInfo.subject === 'VatLi'
      ? 'VẬT LÍ'
      : generalInfo.subject === 'Toan'
      ? 'TOÁN'
      : generalInfo.subject === 'Hoa'
      ? 'HÓA HỌC'
      : 'TIẾNG ANH';
  const semesterLabel =
    generalInfo.semester === 'HK1' ? 'HỌC KÌ I' : generalInfo.semester === 'HK2' ? 'HỌC KÌ II' : 'CẢ NĂM';

  // Matrix Table Header Rows
  const mHeaderRow1Cells: TableCell[] = [
    new TableCell({
      rowSpan: 2,
      width: { size: 5, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'TT', bold: true, color: 'FFFFFF', font: exportSettings.fontFamily, size: 18 })]
        })
      ]
    }),
    new TableCell({
      rowSpan: 2,
      width: { size: 16, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Chủ đề / Chương',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    }),
    new TableCell({
      rowSpan: 2,
      width: { size: 18, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Nội dung / Đơn vị kiến thức',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    })
  ];

  for (const sec of activeSections) {
    mHeaderRow1Cells.push(
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: primaryColor },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: sec.shortTitle,
                bold: true,
                color: 'FFFFFF',
                font: exportSettings.fontFamily,
                size: 17
              })
            ]
          })
        ]
      })
    );
  }

  mHeaderRow1Cells.push(
    new TableCell({
      columnSpan: 3,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Tổng hợp mức độ',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 17
            })
          ]
        })
      ]
    }),
    new TableCell({
      rowSpan: 2,
      width: { size: 7, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Tổng số câu',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 17
            })
          ]
        })
      ]
    }),
    new TableCell({
      rowSpan: 2,
      width: { size: 7, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Điểm số', bold: true, color: 'FFFFFF', font: exportSettings.fontFamily, size: 17 })
          ]
        })
      ]
    }),
    new TableCell({
      rowSpan: 2,
      width: { size: 7, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Tỉ lệ %', bold: true, color: 'FFFFFF', font: exportSettings.fontFamily, size: 17 })
          ]
        })
      ]
    })
  );

  const mHeaderRow2Cells: TableCell[] = [];
  const levels = ['NB', 'TH', 'VD'];

  for (let i = 0; i < activeSections.length; i++) {
    levels.forEach(lvl => {
      mHeaderRow2Cells.push(
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          shading: { fill: subHeaderBg },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: lvl, bold: true, font: exportSettings.fontFamily, size: 16 })]
            })
          ]
        })
      );
    });
  }

  levels.forEach(lvl => {
    mHeaderRow2Cells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: subHeaderBg },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: lvl, bold: true, font: exportSettings.fontFamily, size: 16 })]
          })
        ]
      })
    );
  });

  const matrixTableRows: TableRow[] = [
    new TableRow({ tableHeader: true, cantSplit: true, children: mHeaderRow1Cells }),
    new TableRow({ tableHeader: true, cantSplit: true, children: mHeaderRow2Cells })
  ];

  // Matrix Data Rows
  for (let i = 0; i < matrixRows.length; i++) {
    const r = matrixRows[i];
    const cells: TableCell[] = [];

    cells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(i + 1), font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            children: [new TextRun({ text: r.chapterName, bold: true, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            children: [new TextRun({ text: r.lessonName, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      })
    );

    for (const sec of activeSections) {
      levels.forEach(lvl => {
        const val = r.sectionLevels[sec.id]?.[lvl as 'NB' | 'TH' | 'VD'] || 0;
        cells.push(
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: val > 0 ? String(val) : '',
                    font: exportSettings.fontFamily,
                    size: 18
                  })
                ]
              })
            ]
          })
        );
      });
    }

    levels.forEach(lvl => {
      const sVal = r.summaryLevels[lvl as 'NB' | 'TH' | 'VD'] || 0;
      cells.push(
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: sVal > 0 ? String(sVal) : '',
                  bold: true,
                  font: exportSettings.fontFamily,
                  size: 18
                })
              ]
            })
          ]
        })
      );
    });

    cells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: r.totalItems > 0 ? String(r.totalItems) : '',
                bold: true,
                font: exportSettings.fontFamily,
                size: 18
              })
            ]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: r.totalPoints > 0 ? r.totalPoints.toFixed(2) : '',
                bold: true,
                font: exportSettings.fontFamily,
                size: 18
              })
            ]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: r.percentage > 0 ? `${r.percentage.toFixed(1)}%` : '',
                font: exportSettings.fontFamily,
                size: 18
              })
            ]
          })
        ]
      })
    );

    matrixTableRows.push(new TableRow({ cantSplit: true, children: cells }));
  }

  // Summary Row 1: Tổng số câu
  const sum1Cells: TableCell[] = [
    new TableCell({
      columnSpan: 3,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: 'Tổng số câu / lệnh hỏi',
              bold: true,
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    })
  ];

  for (const sec of activeSections) {
    levels.forEach(lvl => {
      const v = matrixSummary.sectionLevels[sec.id]?.[lvl as 'NB' | 'TH' | 'VD'] || 0;
      sum1Cells.push(
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          shading: { fill: lightBg },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: v > 0 ? String(v) : '',
                  bold: true,
                  font: exportSettings.fontFamily,
                  size: 18
                })
              ]
            })
          ]
        })
      );
    });
  }

  levels.forEach(lvl => {
    const v = matrixSummary.summaryLevels[lvl as 'NB' | 'TH' | 'VD'] || 0;
    sum1Cells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: lightBg },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(v), bold: true, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      })
    );
  });

  sum1Cells.push(
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: String(matrixSummary.totalItems), bold: true, font: exportSettings.fontFamily, size: 18 })
          ]
        })
      ]
    }),
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: matrixSummary.totalPoints.toFixed(2),
              bold: true,
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    }),
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: '100%', bold: true, font: exportSettings.fontFamily, size: 18 })]
        })
      ]
    })
  );
  matrixTableRows.push(new TableRow({ cantSplit: true, children: sum1Cells }));

  // Summary Row 2: Tổng điểm
  const sum2Cells: TableCell[] = [
    new TableCell({
      columnSpan: 3,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: 'Tổng điểm', bold: true, font: exportSettings.fontFamily, size: 18 })]
        })
      ]
    })
  ];

  for (const sec of activeSections) {
    const pts = matrixSummary.sectionPoints[sec.id] || 0;
    sum2Cells.push(
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: lightBg },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `${pts.toFixed(2)} đ`, bold: true, font: exportSettings.fontFamily, size: 18 })
            ]
          })
        ]
      })
    );
  }

  levels.forEach(lvl => {
    const pts = matrixSummary.summaryLevelPoints[lvl as 'NB' | 'TH' | 'VD'] || 0;
    sum2Cells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: lightBg },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: pts.toFixed(2), bold: true, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      })
    );
  });

  sum2Cells.push(
    new TableCell({
      columnSpan: 3,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: `${matrixSummary.totalPoints.toFixed(2)} điểm`,
              bold: true,
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    })
  );
  matrixTableRows.push(new TableRow({ cantSplit: true, children: sum2Cells }));

  // Summary Row 3: Tỉ lệ % điểm
  const sum3Cells: TableCell[] = [
    new TableCell({
      columnSpan: 3,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: 'Tỉ lệ % điểm', bold: true, font: exportSettings.fontFamily, size: 18 })]
        })
      ]
    })
  ];

  for (const sec of activeSections) {
    const pct = matrixSummary.totalPoints > 0 ? ((matrixSummary.sectionPoints[sec.id] || 0) / matrixSummary.totalPoints) * 100 : 0;
    sum3Cells.push(
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: lightBg },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `${pct.toFixed(1)}%`, bold: true, font: exportSettings.fontFamily, size: 18 })
            ]
          })
        ]
      })
    );
  }

  levels.forEach(lvl => {
    const pct = matrixSummary.totalPoints > 0 ? ((matrixSummary.summaryLevelPoints[lvl as 'NB' | 'TH' | 'VD'] || 0) / matrixSummary.totalPoints) * 100 : 0;
    sum3Cells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: lightBg },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `${pct.toFixed(1)}%`, bold: true, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      })
    );
  });

  sum3Cells.push(
    new TableCell({
      columnSpan: 3,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: lightBg },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: '100%', bold: true, font: exportSettings.fontFamily, size: 18 })]
        })
      ]
    })
  );
  matrixTableRows.push(new TableRow({ cantSplit: true, children: sum3Cells }));

  const matrixDocTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: matrixTableRows
  });

  // Specification Table
  const specHeaderCells: TableCell[] = [
    new TableCell({
      width: { size: 5, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'TT', bold: true, color: 'FFFFFF', font: exportSettings.fontFamily, size: 18 })]
        })
      ]
    }),
    new TableCell({
      width: { size: 15, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Chương / Chủ đề',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    }),
    new TableCell({
      width: { size: 18, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Nội dung kiến thức',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    }),
    new TableCell({
      width: { size: 36, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: primaryColor },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Mức độ đánh giá – Yêu cầu cần đạt',
              bold: true,
              color: 'FFFFFF',
              font: exportSettings.fontFamily,
              size: 18
            })
          ]
        })
      ]
    })
  ];

  for (const sec of activeSections) {
    specHeaderCells.push(
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: primaryColor },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: sec.shortTitle,
                bold: true,
                color: 'FFFFFF',
                font: exportSettings.fontFamily,
                size: 17
              })
            ]
          })
        ]
      })
    );
  }

  const specTableRows: TableRow[] = [
    new TableRow({ tableHeader: true, cantSplit: true, children: specHeaderCells })
  ];

  specRows.forEach((row, idx) => {
    const yccdParagraphs: Paragraph[] = [
      new Paragraph({
        children: [
          new TextRun({
            text: row.level === 'NB' ? 'Nhận biết:' : row.level === 'TH' ? 'Thông hiểu:' : 'Vận dụng:',
            bold: true,
            underline: {},
            font: exportSettings.fontFamily,
            size: 18
          })
        ]
      })
    ];

    if (row.yccdList.length === 0) {
      yccdParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '- Chưa gắn YCCĐ cụ thể',
              italics: true,
              font: exportSettings.fontFamily,
              size: 17
            })
          ]
        })
      );
    } else {
      row.yccdList.forEach(y => {
        yccdParagraphs.push(
          new Paragraph({
            children: [new TextRun({ text: `- ${y.text} [${y.id}]`, font: exportSettings.fontFamily, size: 17 })]
          })
        );
      });
    }

    const cells: TableCell[] = [
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(idx + 1), font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            children: [new TextRun({ text: row.chapterName, bold: true, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            children: [new TextRun({ text: row.lessonName, font: exportSettings.fontFamily, size: 18 })]
          })
        ]
      }),
      new TableCell({
        verticalAlign: VerticalAlign.TOP,
        children: yccdParagraphs
      })
    ];

    for (const sec of activeSections) {
      const qVal = row.sectionQuestions[sec.id] || '-';
      cells.push(
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: qVal,
                  bold: qVal !== '-',
                  font: exportSettings.fontFamily,
                  size: 17
                })
              ]
            })
          ]
        })
      );
    }

    specTableRows.push(new TableRow({ cantSplit: true, children: cells }));
  });

  const specDocTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: specTableRows
  });

  // Body content assembling
  const docChildren: (Paragraph | Table)[] = [];
  docChildren.push(schoolHeaderTable);
  docChildren.push(new Paragraph({ text: '', spacing: { after: 200 } }));

  const titleMain = generalInfo.examName.toUpperCase();
  const subTitle = `MÔN: ${subjectLabel} ${generalInfo.grade} - ${semesterLabel} - NĂM HỌC ${generalInfo.schoolYear}`;
  const durationText = `Thời gian làm bài: ${generalInfo.durationMinutes} phút (không kể thời gian giao đề)`;

  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: titleMain, bold: true, font: exportSettings.fontFamily, size: 26, color: primaryColor })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: subTitle, bold: true, font: exportSettings.fontFamily, size: 22 })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: durationText, italics: true, font: exportSettings.fontFamily, size: 20 })],
      spacing: { after: 300 }
    })
  );

  if (exportSettings.exportFormat === 'both' || exportSettings.exportFormat === 'matrix_only') {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: 'I. KHUNG MA TRẬN ĐỀ KIỂM TRA',
            bold: true,
            font: exportSettings.fontFamily,
            size: 22,
            color: primaryColor
          })
        ],
        spacing: { before: 200, after: 150 }
      }),
      matrixDocTable,
      new Paragraph({ text: '', spacing: { after: 300 } })
    );
  }

  if (exportSettings.exportFormat === 'both' || exportSettings.exportFormat === 'spec_only') {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: exportSettings.exportFormat === 'both' ? 'II. BẢN ĐẶC TẢ ĐỀ KIỂM TRA' : 'BẢN ĐẶC TẢ ĐỀ KIỂM TRA',
            bold: true,
            font: exportSettings.fontFamily,
            size: 22,
            color: primaryColor
          })
        ],
        spacing: { before: 200, after: 150 }
      }),
      specDocTable
    );
  }

  // Signature Block
  docChildren.push(
    new Paragraph({ text: '', spacing: { before: 400 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE }
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: 'TỔ TRƯỞNG CHUYÊN MÔN',
                      bold: true,
                      font: exportSettings.fontFamily,
                      size: 20
                    })
                  ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: exportSettings.fontFamily, size: 18 })
                  ]
                })
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: 'GIÁO VIÊN RA ĐỀ',
                      bold: true,
                      font: exportSettings.fontFamily,
                      size: 20
                    })
                  ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: exportSettings.fontFamily, size: 18 })
                  ]
                }),
                new Paragraph({ text: '', spacing: { before: 800 } }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: generalInfo.teacherName || '',
                      bold: true,
                      font: exportSettings.fontFamily,
                      size: 20
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation:
                exportSettings.orientation === 'landscape' ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT
            },
            margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${generalInfo.schoolName || 'TRƯỜNG THPT'} - ${generalInfo.examName}`,
                    font: exportSettings.fontFamily,
                    size: 16,
                    color: '6B7280'
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ', font: exportSettings.fontFamily, size: 16 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: exportSettings.fontFamily, size: 16 }),
                  new TextRun({ text: ' / ', font: exportSettings.fontFamily, size: 16 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: exportSettings.fontFamily, size: 16 })
                ]
              })
            ]
          })
        },
        children: docChildren
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `MaTran_BanDacTa_${generalInfo.subject}${generalInfo.grade}_${generalInfo.semester}.docx`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

