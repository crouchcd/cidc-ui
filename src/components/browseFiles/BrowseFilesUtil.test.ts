import { changeOption, filterFiles } from "./BrowseFilesUtil";

const files = [
    {
        "dataFormat": "FASTQ",
        "experimentalStrategy": "WES",
        "name": "cimac-6521-001.fa",
        "numberOfCases": 1,
        "size": 234,
        "trialId": "DFCI-1234",
    },
    {
        "dataFormat": "FASTQ",
        "experimentalStrategy": "WES",
        "name": "cimac-6521-002.fa",
        "numberOfCases": 1,
        "size": 21,
        "trialId": "DFCI-1234",
    },
    {
        "dataFormat": "FASTQ",
        "experimentalStrategy": "WES",
        "name": "cimac-6521-003.fa",
        "numberOfCases": 1,
        "size": 22345,
        "trialId": "DFCI-1234",
    },
    {
        "dataFormat": "FASTQ",
        "experimentalStrategy": "WES",
        "name": "cimac-6521-004.fa",
        "numberOfCases": 1,
        "size": 12345545,
        "trialId": "DFCI-1234",
    },
    {
        "dataFormat": "VCF",
        "experimentalStrategy": "WES",
        "name": "cimac-6521.vcf",
        "numberOfCases": 1,
        "size": 7654645,
        "trialId": "DFCI-9999",
    },
    {
        "dataFormat": "MAF",
        "experimentalStrategy": "WES",
        "name": "dfci-9999.maf",
        "numberOfCases": 276,
        "size": 1234567,
        "trialId": "DFCI-9999",
    }
]


test("Returns the same file list if nothing is filtered", () => {

    expect(filterFiles(files, [], [], [], "")).toEqual(files);
});
