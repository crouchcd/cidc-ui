import React from "react";
import DataOverviewPage from "./DataOverviewPage";
import { renderAsRouteComponent } from "../../../test/helpers";
import { apiFetch } from "../../api/api";
import { cleanup } from "@testing-library/react-hooks";
import { createMuiTheme } from "@material-ui/core";
import { fireEvent, within } from "@testing-library/dom";
jest.mock("../../api/api");

const theme = createMuiTheme();

afterEach(() => {
    // the mocks below don't work without calling this
    // cleanup function (don't know the root cause yet,
    // but it's useSWR-related)
    cleanup();
});

const innerText = (elem: HTMLElement, text: string) =>
    within(elem).queryByText(text);

it("displays data as expected", async () => {
    const excluded = { cimac_id: "CTTTPP01", reason_excluded: "some reason" };
    apiFetch.mockImplementation(async (url: string) => {
        switch (url) {
            case "/info/data_overview":
                return { num_bytes: 1e9 };
            case "/trial_metadata/summaries":
                return [
                    {
                        trial_id: "tr1",
                        file_size_bytes: 1e3,
                        clinical_participants: 1,
                        total_participants: 2,
                        expected_assays: ["wes", "h&e", "ihc"],
                        "h&e": 11,
                        wes_normal: 5,
                        wes_tumor: 6,
                        wes_analysis: 5,
                        wes_tumor_only_analysis: 1,
                        ihc: 0,
                        excluded_samples: { wes_analysis: [excluded] }
                    },
                    {
                        trial_id: "tr2",
                        file_size_bytes: 1e6,
                        clinical_participants: 0,
                        total_participants: 3,
                        expected_assays: ["h&e", "ihc"],
                        "h&e": 21,
                        wes_normal: 0,
                        wes_tumor: 0,
                        ihc: 22
                    }
                ];
            default:
                throw Error("got unexpected URL " + url);
        }
    });

    const { findByText, queryByText, getByTestId } = renderAsRouteComponent(
        DataOverviewPage
    );

    // from per-trial data summaries
    expect(await findByText(/trial/i)).toBeInTheDocument();
    expect(queryByText(/tr1/i)).toBeInTheDocument();
    expect(queryByText(/tr2/i)).toBeInTheDocument();
    expect(queryByText(/h&e/i)).toBeInTheDocument();
    expect(queryByText(/wes_normal/i)).toBeInTheDocument();
    expect(queryByText(/wes_tumor/i)).toBeInTheDocument();
    expect(queryByText(/1 kb/i)).toBeInTheDocument();
    expect(queryByText(/1 mb/i)).toBeInTheDocument();
    expect(
        innerText(getByTestId("data-tr1-h&e-received"), "11")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("data-tr1-wes_tumor-received"), "6")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("data-tr1-wes_normal-received"), "5")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("data-tr1-ihc-received"), "0")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("data-tr2-h&e-received"), "21")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("data-tr2-ihc-received"), "22")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("na-tr2-wes_tumor-received"), "-")
    ).toBeInTheDocument();
    expect(
        innerText(getByTestId("na-tr2-wes_normal-received"), "-")
    ).toBeInTheDocument();

    const wesAnalyzed = getByTestId("data-tr1-wes_normal-analyzed");
    expect(innerText(wesAnalyzed, "5")).toBeInTheDocument();
    const wesTumorOnlyAnalyzed = getByTestId("data-tr1-wes_tumor-analyzed");
    expect(innerText(wesTumorOnlyAnalyzed, "1")).toBeInTheDocument();

    // sample exclusions are displayed on hover
    fireEvent.mouseOver(wesAnalyzed.firstElementChild!);
    expect(await findByText(excluded.cimac_id)).toBeInTheDocument();
    expect(
        queryByText(new RegExp(excluded.reason_excluded, "i"))
    ).toBeInTheDocument();

    // clinical data is displayed (and colored) as expected
    const partialClinical = queryByText(/1 \/ 2 participants/i);
    expect(partialClinical).toBeInTheDocument();
    expect(partialClinical?.closest("div")).toHaveStyle(
        `color: ${theme.palette.primary.main}`
    ); // blue
    const fullClinical = queryByText(/0 \/ 3 participants/i);
    expect(fullClinical).toBeInTheDocument();
    expect(fullClinical?.closest("div")).toHaveStyle(
        `color: ${theme.palette.text.primary}`
    ); // grey

    // from CIDC-wide data overview
    expect(queryByText(/1 gb/i)).toBeInTheDocument();
});

it("handles no data", async () => {
    apiFetch.mockResolvedValue([]);
    const { findByText } = renderAsRouteComponent(DataOverviewPage);
    expect(await findByText(/no data/i)).toBeInTheDocument();
});
