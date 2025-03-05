// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CustomerProfile {
    struct Profile {
        string name;
        string email;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(address => Profile) private profiles;

    event ProfileCreated(address indexed user, string name, string email);
    event ProfileUpdated(address indexed user, string name, string email);

    function createProfile(string memory _name, string memory _email) public {
        require(bytes(profiles[msg.sender].name).length == 0, "Profile exists");

        profiles[msg.sender] = Profile(_name, _email, block.timestamp, block.timestamp);
        emit ProfileCreated(msg.sender, _name, _email);
    }

    function updateProfile(string memory _name, string memory _email) public {
        require(bytes(profiles[msg.sender].name).length > 0, "Profile not found");

        profiles[msg.sender].name = _name;
        profiles[msg.sender].email = _email;
        profiles[msg.sender].updatedAt = block.timestamp;

        emit ProfileUpdated(msg.sender, _name, _email);
    }

    function getProfile(address _user) public view returns (Profile memory) {
        return profiles[_user];
    }
}
