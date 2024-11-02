const xlsx = require('xlsx');
const path = require('path');
const {
    DaysInMonth
} = require('../src/majorFunction.js');

const filePath = path.resolve(__dirname, '../Lab3.xlsx');
describe('Excel Test Cases', () => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const testCases = xlsx.utils.sheet_to_json(worksheet, {
        header: 1
    }).slice(1);

    afterAll(() => {
        xlsx.writeFile(workbook, filePath);
    });

    testCases.forEach(([month, year, expectedResult], index) => {
        test(`DaysInMonth should return ${expectedResult} for month ${month} and year ${year}`, () => {
            const resCelPos = xlsx.utils.encode_cell({
                r: index + 1,
                c: 3
            });

            try {
                const result = DaysInMonth(year, month);
                expect(result).toBe(expectedResult);
                worksheet[resCelPos] = {
                    v: "Pass"
                };
            } catch (error) {
                worksheet[resCelPos] = {
                    v: "Fail"
                };
                console.error('Stupid GPT');
                throw error;
            }
        });
    });
});