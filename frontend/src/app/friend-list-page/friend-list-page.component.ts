import { Component, OnInit } from '@angular/core';
import PangolinModel from 'src/models/pangolin.model';
import AuthService from 'src/services/auth.service';
import PangolinService from 'src/services/pangolin.service';

@Component({
  selector: 'friend-list-page',
  templateUrl: './friend-list-page.component.html',
  styleUrls: ['./friend-list-page.component.css']
})
export class FriendListPageComponent implements OnInit {

  userPangolin?: PangolinModel
  pangolinList: PangolinModel[] = []
  searchString = ""

  constructor(private pagolinService: PangolinService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUserPangolin()
    this.fetchPangolinList()
  }
  // API
  fetchUserPangolin() {
    this.pagolinService.findOnePangolin(this.authService.getUserId())
      .subscribe({
        next: (pangolin) => {
          this.userPangolin = pangolin
        },
        error(error) {
          console.error(error)
        }
      })
  }
  fetchPangolinList() {
    this.pagolinService.findAllPangolin()
      .subscribe({
        next: (pangolinList) => {
          this.pangolinList = pangolinList.filter((otherPangolin) => otherPangolin._id != this.userPangolin?._id)
        },
        error(error) {
          console.error(error)
        }
      })
  }
  updatePangolin() {
    if (!this.userPangolin) {
      return
    }
    this.pagolinService.updatePangolin(this.userPangolin._id, this.userPangolin)
    .subscribe({
      next: (resBody) => {
        console.log(resBody.message)
      },
      error(error) {
        console.error(error)
      },
      complete: () => {
        this.fetchUserPangolin()
      }
    })
  }

  // Computed
  pangolinListToDisplay(): PangolinModel[] {
    return this.pangolinList.filter((otherPangolin) => otherPangolin.username.toLowerCase().includes(this.searchString.toLowerCase())) ?? []
  }
  friendList(): PangolinModel[] {
    return this.pangolinList.filter((otherPangolin) => this.userPangolin?.friendIdList.some((friendId) => otherPangolin._id == friendId))
  }
  isFriend(otherPangolin: PangolinModel) {
    return this.userPangolin?.friendIdList.some((friendId) => friendId == otherPangolin._id)
  }
  getIcon(pangolin: PangolinModel) {
    console.log(pangolin)
    return `url(../../assets/icons/${pangolin.role.toLowerCase()}.png)`
  }

  // Methods
  addToFriendList(otherPangolin: PangolinModel) {
    if (!this.userPangolin || this.isFriend(otherPangolin)) {
      return
    }
    this.userPangolin.friendIdList.push(otherPangolin._id)
    this.updatePangolin()
  }
  removeToFriendList(friend: PangolinModel) {
    if (!this.userPangolin || !this.isFriend(friend)) {
      return 
    }
    this.userPangolin.friendIdList = this.userPangolin.friendIdList.filter((friendId) => friendId != friend._id)
    this.updatePangolin()
  }
}
