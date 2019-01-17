import * as React from 'react';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css/github-markdown.css';

const markdownContent: string = `
# Documentation for Whole Exome Sequencing Pipeline

# Table of Contents
- [Introduction](#introduction)
- [Workflow](#workflow)
- [Pipeline Inputs](#input)
- [Pipeline Outputs](#output)

## Introduction <a name="introduction"></a>

CIDC Whole Exome Pipeline is a computational workflow for identifying somatic variants from tumor sample. The pipeline includes 
tools for quality control (QC) and characterization of paired (tumor/normal) whole exome sequencing data.  The outputs of the pipeline includes
VCF files and MAF files.

## Workflow <a name="workflow"></a>

- Quality Control: FASTQC
- Alignment: bwa-mem
- Variant Calling: Mutect
- Variant Annotation: VEP

# Pipeline Inputs <a name="input"></a>
- Fastq files
- Config file

# Pipeline Outputs <a name="output"></a>
- VCF file
- MAF file
`;

export default class WholeExomeSequencingPipelineMarkdown extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <ReactMarkdown source={markdownContent} className="markdown-body markdown-width" />
            </div>
        );
    }
}
