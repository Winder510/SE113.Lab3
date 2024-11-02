const xlsx = require('xlsx');
const path = require('path');
const {
    isValidDate
} = require('../src/majorFunction.js');

const filePath = path.resolve(__dirname, '../Lab3.xlsx');

describe('Excel Test Cases', () => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];
    const testCases = xlsx.utils.sheet_to_json(worksheet, {
        header: 1
    }).slice(1).filter(row => row[0] !== undefined && row[1] !== undefined && row[2] !== undefined && row[3] !== undefined);

    afterAll(() => {
        xlsx.writeFile(workbook, filePath);
    });

    testCases.forEach(([day, month, year, expectedResult], index) => {
        test(`isValidDate should return ${expectedResult} for day ${day}, month ${month}, year ${year}`, () => {
            const resCelPos = xlsx.utils.encode_cell({
                r: index + 1,
                c: 4
            }); // Column index for Output
            try {
                const result = isValidDate(year, month, day);
                expect(result).toBe(expectedResult);
                worksheet[resCelPos] = {
                    v: "Pass"
                };
            } catch (error) {
                worksheet[resCelPos] = {
                    v: "Fail"
                };
                throw error;
            }


        });
    });
});