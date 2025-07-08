/* eslint-disable react/prop-types */
import React from 'react';
import Icon from '../icon/Icon';
import { format } from 'date-fns';

/**
 * @TODO
 * 파일 다운로드 아이콘 변경 필요
 */
const FileBox = ({ gubun, date, title, desc, onDownload }) => {
    return (
        <div className="filebox">
            <div className="file-area">
                <div className="title-wrap select-none">
                    <p className="file-title select-none">{`${gubun ? `${gubun} | ` : ''}${title}`}</p>
                    <Icon icon="download" onClick={onDownload} />
                </div>
                <div className="desc-wrap">
                    <p className="file-desc select-none">{desc}</p>
                    {date &&
                        <p className="date select-none">{`${format(new Date(date), 'yyyy-MM-dd')}`}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default FileBox;
