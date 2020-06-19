import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Product } from "../product";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: "./product-edit-tags.component.html",
})
export class ProductEditTagsComponent implements OnInit {
  @ViewChild("categoryVar", { static: false }) categoryVar: NgForm;
  errorMessage: string;
  newTags = "";
  product: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe((data) => {
      if (this.categoryVar) {
        this.categoryVar.reset();
      }
      this.product = data["resolvedProduct"].product;
    });
  }

  // Add the defined tags
  addTags(): void {
    if (!this.newTags) {
      this.errorMessage =
        "Enter the search keywords separated by commas and then press Add";
    } else {
      const tagArray = this.newTags.split(",");
      this.product.tags = this.product.tags
        ? this.product.tags.concat(tagArray)
        : tagArray;
      this.newTags = "";
      this.errorMessage = "";
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.product.tags.splice(idx, 1);
  }
}
