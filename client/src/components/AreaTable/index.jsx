import React from "react";
import { Button, Table } from 'antd';
import "./style.css";
import { sendMessage } from "../../containers/App/ws";

class AreaTable extends React.Component {

    onClickEndCampaign = () => {
        const { userId, requestInfo, setBidClosed } = this.props;
        const { _id } = requestInfo;

        sendMessage("END_CAMPAIGN", { userId, bidId: _id }, (res) => {
            if (!res.error) {
                setBidClosed(_id);
            }
        })
    };

    getTableData = () => {
        const { dataSource, unreadLiveBids } = this.props;
        let dataTable = [...dataSource];
        dataTable.sort((offer1, offer2) => {
            if (+offer1.price > +offer2.price) return 1;
            else if (+offer1.price < +offer2.price) return -1;
            else return 0;
        });

        if (dataTable && dataTable.length && dataTable[0].price && dataTable[0].price.indexOf('⭐') === -1)
            dataTable[0].price = dataTable[0].price + ' ⭐';
        return dataTable;
    };

    render() {
        const {id, requestInfo, columns, loading, locale, unreadLiveBids, handleMarkRead} = this.props;

        return (
            <div className="area-table">
                <div className="area-table-descr">
                    {requestInfo.color ? <div>{requestInfo.color}</div> : null}
                    {requestInfo.manufacturer ? <div>{requestInfo.manufacturer}</div> : null}
                    {requestInfo.car ? <div>{requestInfo.car}</div> : null}
                    {requestInfo.model ? <div>{requestInfo.model}</div> : null}
                    <Button className="area-table-descr-btn" onClick={this.onClickEndCampaign}>
                        End campaign
                    </Button>
                </div>
                <Table
                    key={id}
                    dataSource={this.getTableData()}
                    columns={columns}
                    loading={loading}
                    locale={locale}
                    pagination={{ pageSize: 5 }}
                    rowClassName={(record) => unreadLiveBids.indexOf(record._id) !== -1 ? 'new' : ''}
                    onRow={(record) => {
                        return {
                            onMouseEnter: () => {
                                return unreadLiveBids.indexOf(record._id) !== -1 ? handleMarkRead(record._id) : {}
                            },
                        };
                    }}
                />
            </div>
        )
    }
}

AreaTable.propTypes = {
};

export default AreaTable;
