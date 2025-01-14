---
title: Looker Best Practices
date: "2024-06-18T11:00:00+00:00"
lang: en
tags:
  - Reporting
  - Data
  - Engineering
  - Looker
  - Utils
---

This article gathers recommended best practices for Looker service

## Intro ##

This article gathers recommended best practices for Looker service

## Best Practices ##

Use your best judgment when implementing any of the recommendations shared on this page. This information is a consolidation from the official Google pages on the reference links

### Do's ###

#### Do: Define the relationship parameter for all joins ####

This will ensures that metrics aggregate properly within Looker. By default, Looker will use a `many_to_one` join relationship for any joins in which a relationship is not defined.

```lookml
explore: view_name {
  join: view_name_2 {
    relationship: one_to_one
  }
}
```

**More Info**: <https://cloud.google.com/looker/docs/best-practices/how-to-use-the-relationship-parameter-correctly>

#### Do: Define a primary key within every view ####

All views, whether they are derived or coming directly from the database, should contain a primary key. This primary key should be a unique value to enable Looker to uniquely identify any given record. This primary key can be a single column or a concatenation of columns — it simply needs to be a unique identifier for the table or derived table.

**Example**:

```lookml
view: view_name {
  dimension: field_name {
    primary_key: yes 
  }
}
```

**More Info**: <https://cloud.google.com/looker/docs/reference/param-field-primary-key>

#### Do: Name LookML objects in snake_case ####

The label parameter can be used for additional formatting of a name field, and can also be used to customize the appearance of view names, Explore names, and model names.

**Example**:

```lookml
      measure: customer_count_distinct {
        label: "Number of Customers"
        type: count_distinct
        sql: ${customer.id} ;;
      }
```

#### Do: Use Datagroups ####

 Use datagroups to align generation of persistent derived tables (PDTs) and Explore caching with underlying ETL processes. Datagroups can also be used to trigger deliveries of dashboards or Looks to ensure that up-to-date data is sent to recipients.

**Example**:

```lookml
datagroup: datagroup_name {
  max_cache_age: "24 hours"
  sql_trigger: SELECT max(id) FROM my_tablename ;;
  interval_trigger: "12 hours"
  label: "desired label"
  description: "description string"
}
```

**More info**: <https://cloud.google.com/looker/docs/reference/param-model-datagroup>

### Don't ###

#### Don't: Use the from parameter for renaming views within an Explore ####

The from parameter should primarily be used in the following situations:

* Polymorphic joins (joining the same table multiple times)
* Self-joins (joining a table to itself)
* Re-scoping an extended view back to its original view name

Use the `view_label` instead

```lookml
explore: explore_name {
  view_label: "desired label for the view"
}
```

**More Info**: <https://cloud.google.com/looker/docs/reference/param-explore-from>

#### Don't: Use the word "date" or "time" in a dimension group name ####

Looker **appends each time-frame to the end of the dimension group name**. This means that a dimension group named `created_date` results in fields called `created_date_date`, `created_date_month`, and so on. Simply use `created` as the dimension group name, because this results in fields named `created_date`, `created_month`, and so on.

**Example**:

```lookml
dimension_group: since_event {
  type: duration
  intervals: [hour, day]
  sql_start: ${faa_event_date_raw} ;;
  sql_end: CURRENT_TIMESTAMP();;
}
```

**More Info**: <https://cloud.google.com/looker/docs/reference/param-field-dimension-group>

#### Don't: Use formatted timestamps within joins ####

Instead, use the raw time-frame option for joining on any date or time fields. This will avoid the inclusion of casting and timezone conversion in join predicates.

**Example**:

```lookml
dimension_group: created {
  type: time
  timeframes: [date, week, month]
  sql: ${TABLE}.created_at ;;
}
```

**More Info**: <https://cloud.google.com/looker/docs/reference/param-field-dimension-group#timeframes>

## Improve Experience ##

LookML developers can consider following these tips to improve their users' experience with Looker:

### Provide users with meaningful field names ###

* Use the [label](https://cloud.google.com/looker/docs/reference/param-field-label) parameter to apply user-friendly names to dimensions or measures while maintaining database-friendly names within the view and model files. Make sure to align terminology with a Business Glossary, you may start with Governance tool like [marquez](https://rramos.github.io/2024/06/06/marquez/)

* Avoid exposing multiple fields with the same name. For example, measures of type: count are automatically created within Looker with the name Count. This results in most view files containing a count measure with the same name. Multiple fields with the same name can confuse users.

* Provide clear names for fields of `type: yesno`. For example, use **Was the Item Returned?** instead of **Returned** to name a field that indicates whether an item has been returned.

* Name ratios descriptively. For example, **Orders Per Purchasing Customers** is clearer than **Orders Percent*.

* Name fields and represent values consistently across the model. Using the [value_format](https://cloud.google.com/looker/docs/reference/param-field-value-format) or [value_format_name](https://cloud.google.com/looker/docs/reference/param-field-value-format-name) parameter to apply formatting such as currency symbols, percentages, and decimal precision to numerical fields will help make everything clearer to your users.

### Group similar fields together for easier navigation ###

* Use the group_label parameter to consolidate dimensions and measures from individual or multiple joined views that are related.

```lookml
    dimension: city {
      group_label: "Geography"
      type: string
      sql: ${TABLE}.city ;;
    }

    dimension: country {
      group_label: "Geography"
      type: string
      map_layer_name: countries
      sql: ${TABLE}.country ;;
    }
    
```

**More Info**: <https://cloud.google.com/looker/docs/reference/param-field-group-label>

* Break up large, denormalized tables using the [`view_label`](https://cloud.google.com/looker/docs/reference/param-field-view-label) parameter. Utilize the `view_label` parameter within fields to group fields together logically into separate headings within the field picker. Large, denormalized tables with a lot of fields can be difficult to navigate

### Avoid exposing too much to users initially ###

* Avoid exposing too much to users upon an initial Looker roll-out. Start small, and then expand the options. You don't have to expose all the tables or dimensions and measures at once. You can expose the most important fields at first and then continue to build in more functionality as business users become more confident with data exploration.

* Hide dimensions that are not relevant to users from the user interface. Use the [`hidden`](https://cloud.google.com/looker/docs/reference/param-field-hidden) parameter on dimensions that will never be used through the user interface (such as ID fields or database update dates).

* Use the [`fields`](https://cloud.google.com/looker/docs/reference/param-explore-join-fields) parameter within Explores and joins to limit the number of fields that are available to users. Included fields should be only those relevant to the Explore. This reduces bloat and provides a better experience for users.

* Hide any Explores that exist solely for populating specific Looks, dashboard tiles, or filters using the [`hidden` parameter for Explores](https://cloud.google.com/looker/docs/reference/param-explore-hidden). Explores that are not meant for exploration by users should be hidden from the user interface.

* Use the fewest number of Explores possible while still allowing users to easily get access to the answers they need. Consider splitting out Explores into different models for different audiences to [limit the options available for each user group](https://cloud.google.com/looker/docs/access-control-and-permission-management#controlling_feature_and_data_access). The optimal number of Explores is different for every business, but having too many Explores tends to confuse users.

### Add descriptions so users know which fields and Explores to use ###

* Use the [`description`](https://cloud.google.com/looker/docs/reference/param-field-description) parameter on dimensions and measures to provide additional information to users about the logic or calculations that are used within the model. This is particularly important for dimensions and measures that leverage complex logic or calculations. That being said, it's a good idea to also consider descriptions for simpler fields to be sure that users understand the definitions behind them.

```lookml
dimension: id {
  primary_key: yes
  description: "Unique ID for the order"
  type: string
  sql: ${TABLE}.id ;;
```

* Define [Explore descriptions](https://cloud.google.com/looker/docs/reference/param-explore-description) for users. Add a short description to each Explore to specify the purpose of the Explore and the audience who will use it.

```lookml
explore: user {
  description: "All customer users, staff users are excluded"
}
```

### Build common workflows into Looker ###

Add [`drill_fields`](https://cloud.google.com/looker/docs/reference/param-field-drill-fields) to all hierarchical dimensions. For example, adding a `drill_field` for **City** into a **State** dimension will let users select a state and then drill deeper into the cities within that state. Note that this hierarchical drilling will automatically be applied within time dimension groups.

```lookml
dimension: country {
  sql: ${TABLE}.country ;;
  drill_fields: [state, city]
}
```

Add [`drill_fields`](https://cloud.google.com/looker/docs/reference/param-field-drill-fields) to all relevant measures. Drill fields enable users to click into aggregate values in order to access detailed data. Use the [`set`](https://cloud.google.com/looker/docs/reference/param-view-set) parameter to create reusable sets of fields that can then be applied to any number of measures within a view.

```lookml
set: financial_data {
  fields: [
    subtotal,
    shipping,
    tax,
    total,
    cost,
    profit
  ]
}

view: logistics {
  dimension: logistics_cost {
    drill_fields: [financial_data]
  }
}
```

Set up links that enable users to easily navigate and pass filters to other Looker dashboards or to systems or platforms that are external to Looker. See our [documentation on the `link` parameter](https://docs.looker.com/reference/field-params/link?lookml=new#passing_a_querys_filter_values_into_a_link) for examples of passing filters through drills.

```lookml
dimension: name {
  link: {
    label: "Business Pulse By State Dashboard"
    url: "https://instance_name.looker.com/dashboards/694?State={{ _filters['users.state'] | url_encode }}"
  }
}
```

## Conclusion ##

In this article we went through several best practices recommendations described on Looker Official docs, do's and don'ts and how to improve user experience.

## Next Steps ##

Although guidelines and best practices are really useful, I believe introducing testing procedures on your CI/CD process would increase the level of quality for your Looker Models. So a next step from this article would be such implementation

## References ##

* <https://cloud.google.com/looker/docs/best-practices/best-practices-lookml-dos-and-donts>
* <https://cloud.google.com/looker/docs/best-practices/how-to-create-a-positive-experience-for-looker-users>
