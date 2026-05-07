"use client";

import React from 'react';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

interface ExcelExportProps {
    data: any[];
    fileName: string;
    sheetName?: string;
}

export default function ExcelExport({ data, fileName, sheetName = 'Sheet1' }: ExcelExportProps) {
    const handleExport = () => {
        if (!data || data.length === 0) {
            alert("No data to export");
            return;
        }

        // Clean data: remove __v, updatedAt, etc. if present
        const cleanData = data.map(item => {
            const { __v, updatedAt, ...rest } = item;
            return rest;
        });

        const worksheet = XLSX.utils.json_to_sheet(cleanData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-md active:scale-95"
        >
            <Download size={14} />
            Export Excel
        </button>
    );
}
