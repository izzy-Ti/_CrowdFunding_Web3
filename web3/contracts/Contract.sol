// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountcollected;
        string image;
        address[] donators;
        uint256[] donatersamount;
    }

    mapping(uint256 => campaign) public campaigns;
    uint public NoOfCampains = 0 ;

    function createCampaign (address _owner, string memory _title, string memory _description, 
        uint _target, uint _deadline, string memory _image) public returns( uint) {
        Campaign storage campaign = campaigns [NoOfCampains];
        require(campaign.deadline < block.timestamp , "Sorry the deadline must be in future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        NoOfCampains ++;

        return NoOfCampains - 1; 
    }
    function DonateCampaign (uint _id) public payable {
        uint amount = msg.value;

        Campaign storage campaign = campaigns [_id];

        campaign.donators[].push(msg.sender);
        campaign.donatersamount[].push(amount);

        (bool sent,) = payable (campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountcollected = campaign.amountcollected + amount;
        }

    }
    function getDonners (uint _id) public view returns(address[] memory, uint[] memory) {
        return( campaigns[_id].donators, campaigns[_id].donatersamount);
    }
    function getCampain () public view returns(Campaign[] memory) {
        Campaign[] memory newCampaign = new Campaign[](NoOfCampains);

        for(uint i=0 ; i< NoOfCampains; i++){
            campaign storage item = campaign[i];

            newCampaign[i] = item;

            return newCampaign;
        }
    }
}