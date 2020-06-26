import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const toolbarWrapper = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;
const toolbarControl = css`
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 14px;
  border: 0;
  font-size: 2rem;
  padding: 10px;

  &:hover {
    background: rgba(0, 0, 0, 0.75);
  }
`;
const osdToolbarDropdownWrapper = css`
  position: relative;
  display: inline-block;
`;
const osdToolbarDropdown = css`
  position: absolute;
  top: 50px;
  left: -65px;
  background: #342f2e;
  color: #e3e3e3;
  width: 200px;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #716c6b;

  button {
    padding: 0.75rem 1rem;
    color: #f0f0f0;
    display: inline-block;
    width: 100%;
    font-size: 1rem;
    &:hover {
      background: #716c6b;
      transition: all 0.25s ease-in-out;
    }
  }
`;

const Toolbar = ({ onDownloadCropClick, onDownloadFullSize }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  function handleDownloadClick(e) {
    e.preventDefault();
    setDropDownOpen(!dropDownOpen);
  }

  function handleDownloadCropClick(e) {
    e.preventDefault();
    onDownloadCropClick();
    setDropDownOpen(false);
  }

  function handleDownloadFullSize(e) {
    e.preventDefault();
    onDownloadFullSize();
    setDropDownOpen(false);
  }

  return (
    <nav css={toolbarWrapper} className="osrv-toolbar-wrapper">
      <button
        id="zoom-in"
        data-testid="zoom-in"
        href="#zoom-in"
        css={toolbarControl}
        className="osrv-toolbar-button"
        title="Zoom In"
      >
        <FontAwesomeIcon icon="search-plus" />
      </button>
      <button
        id="zoom-out"
        data-testid="zoom-out"
        href="#zoom-out"
        css={toolbarControl}
        className="osrv-toolbar-button"
        title="Zoom Out"
      >
        <FontAwesomeIcon icon="search-minus" />
      </button>
      {!isMobile && (
        <button
          id="full-page"
          data-testid="full-page"
          href="#full-page"
          css={toolbarControl}
          className="osrv-toolbar-button"
          title="Full Screen"
        >
          <FontAwesomeIcon icon="expand" />
        </button>
      )}

      {!isMobile && (
        <div css={osdToolbarDropdownWrapper}>
          <button
            data-testid="download"
            onClick={handleDownloadClick}
            css={toolbarControl}
            className="osrv-toolbar-button"
            aria-haspopup="true"
            aria-expanded={dropDownOpen}
            title="Download"
          >
            <FontAwesomeIcon icon="download" />
          </button>
          {dropDownOpen && (
            <ul css={osdToolbarDropdown}>
              <li>
                <button
                  data-testid="download-crop"
                  title="Download cropped canvas"
                  onClick={handleDownloadCropClick}
                  css={toolbarControl}
                  className="osrv-toolbar-button"
                >
                  Download crop
                </button>
              </li>
              <li>
                <button
                  data-testid="download-full"
                  onClick={handleDownloadFullSize}
                  css={toolbarControl}
                  className="osrv-toolbar-button"
                  title="Download full size image"
                >
                  Download full size
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
      <button
        id="previous"
        data-testid="previous"
        href="#previous"
        css={toolbarControl}
        className="osrv-toolbar-button"
        title="Previous"
      >
        <FontAwesomeIcon icon="arrow-circle-left" />
      </button>
      <button
        id="next"
        data-testid="next"
        href="#next"
        css={toolbarControl}
        className="osrv-toolbar-button"
        title="Next"
      >
        <FontAwesomeIcon icon="arrow-circle-right" />
      </button>
    </nav>
  );
};

Toolbar.propTypes = {
  /** Show if the device is mobile using package `react-device-detect` */
  isMobile: PropTypes.bool,
  /** Callback function executed when Dropdown Crop is clicked */
  onDownloadCropClick: PropTypes.func,
  /** Callback function executed when Dropdown Full size is clicked */
  onDownloadFullSize: PropTypes.func,
};

export default Toolbar;
