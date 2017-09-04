# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
  Note.create(body: "This is a goddam today note",
              last_seen: DateTime.now )
  Note.create(body: "This is a note from yesterday",
              last_seen: DateTime.yesterday )
  Note.create(body: "This is a goddam note from two days ago",
              last_seen: 2.days.ago )
  Note.create(body: "This is a goddam ancient note. So long ago.",
              last_seen: 3.days.ago )
